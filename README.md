<h1 align="center">
  <br>
  <a href="https://ryujinx.org/"><img src="https://i.imgur.com/WcCj6Rt.png" alt="Ryujinx" width="150"></a>
  <br>
  <b>Ryujinx</b>
  <br>
  <sub><sup><b>(REE-YOU-JINX)</b></sup></sub>
  <br>

</h1>

<p style="text-align:center">
    <a href="https://discord.com/invite/VkQYXAZ">
        <img src="https://img.shields.io/discord/410208534861447168?color=5865F2&label=Ryujinx&logo=discord&logoColor=white"
            alt="Discord">
    </a>
</p>

## Configuration

This app can be configured using the following environment variables:

| Name           | Description                                                                               | Default value | Notes                                                                  |
| :------------- | ----------------------------------------------------------------------------------------- | :-----------: | ---------------------------------------------------------------------- |
| `NODE_ENV`     | This should be set to `production` or `development` depending on the current environment. |     `""`      |                                                                        |
| `HOST`         | The address this server should be listening on.                                           | `"127.0.0.1"` |                                                                        |
| `PORT`         | The port this server should be using.                                                     |    `3000`     |                                                                        |
| `REDIS_URL`    | The URL of the redis server.                                                              |     `""`      | Format: `redis[s]://[[username][:password]@][host][:port][/db-number]` |
| `REDIS_SOCKET` | The path to the unix socket of the redis server.                                          |     `""`      | If this is not empty `REDIS_URL` will be ignored.                      |

## Contribute

### Development

We do encourage you talk to some devs in #development (on our Discord) before developing any PRs so we can make sure you aren't conflicting with another dev's plans, and so we can help you get accustomed to our code base and methods.

## Contact

If you have contributions, suggestions, need website support or just want to get in touch with the team, join our [Discord server](https://discord.com/invite/Ryujinx).

## Donations

If you'd like to support the project financially, Ryujinx has an active Patreon campaign.

<a href="https://www.patreon.com/ryujinx">
    <img alt="patreon" src="https://images.squarespace-cdn.com/content/v1/560c1d39e4b0b4fae0c9cf2a/1567548955044-WVD994WZP76EWF15T0L3/Patreon+Button.png?format=500w" width="150">
</a>

All developers working on the project do so in their free time, but the project has several expenses:

- Hackable Nintendo Switch consoles to reverse-engineer the hardware
- Additional computer hardware for testing purposes (e.g. GPUs to diagnose graphical bugs, etc.)
- Licenses for various software development tools (e.g. Jetbrains, IDA)
- Web hosting and infrastructure maintenance (e.g. LDN servers)

All funds received through Patreon are considered a donation to support the project. Patrons receive early access to progress reports and exclusive access to developer interviews.

## License

This software is licensed under the terms of the <a href="https://github.com/Ryujinx/Ryujinx-Ldn-Website/blob/master/LICENSE" target="_blank">MIT license.</a></i><br />
