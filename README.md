# HMAC Authentication Plugin

This plugin enables HMAC based authentication for requests in [Insomnia REST Client](https://insomnia.rest/).

## Install (Source)

```
mkdir -p $HOME/Library/Application\ Support/Insomnia/plugins
cd $HOME/Library/Application\ Support/Insomnia/plugins
git clone https://github.com/jackjoe/insomnia-plugin-hmac-auth.git insomnia-plugin-hmac-auth
cd insomnia-plugin-hmac-auth
npm install
```

## Installation (Package)

Inside Insomnia plugin manager simply install the `insomnia-plugin-hmac-auth` plugin.

## Usage

In you environment add these variables:

```
{
  HMAC_username: "user name",
  HMAC_secret: "sign secret"
}
```

Once these are defined, the plugin will add the following headers to every request:

```
X-Date: [date time of the request]
Authorization: APIAuth [username]:[signature]
```

The signature is build up by 5 components that are glued together and hashed with the hmac sha-256 algorithm and the APP secret:

* method (GET, POST, ...),
* content type,
* md5 hash of the request body,
* path,
* date (see X-Date).
