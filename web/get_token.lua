local token_cache = ngx.shared.token_cache
local token = token_cache:get("auth_token")

if not token then
    -- Fetch new token
    local http = require("resty.http")
    local httpc = http.new()

    local res, err = httpc:request_uri("{BE_URL}", {
        method = "POST",
        body = '{"email": "{EMAIL}","password": "{PASSWORD}"}',
        headers = {
            ["Content-Type"] = "application/json",
        },
        ssl_verify = false,
    })

    if not res then
        ngx.log(ngx.ERR, "Failed to fetch token: ", err)
        ngx.exit(500)
    end

    if res.status ~= 200 then
        ngx.log(ngx.ERR, "Failed to fetch token, status: ", res.status)
        ngx.exit(500)
    end

    local cjson = require("cjson")
    local response_data = cjson.decode(res.body)
    token = response_data["access_token"]

    if token then
        token_cache:set("auth_token", token, 300)  -- Cache token for 5 minutes
    end
end

if token then
    ngx.req.set_header("Authorization", "Bearer " .. token)  -- Set token in the header
    ngx.log(ngx.INFO, "Request Method: ", ngx.req.get_method())
    ngx.log(ngx.INFO, "Request URI: ", ngx.var.uri)
    ngx.log(ngx.INFO, "Request Body: ", ngx.req.get_body_data() or "No Body")
    ngx.log(ngx.INFO, "Headers: ", ngx.req.get_headers()["Authorization"] or "No Auth Header")
else
    ngx.log(ngx.ERR, "Failed to retrieve token")
    ngx.exit(500)
end
