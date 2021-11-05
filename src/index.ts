import fetch from 'node-fetch'

type TDnsOpts = {
  host: string
  ip: string
}

type TBegetSettings = {
  login: string
  pass: string
}

export class BegetAPI {
  private settings: TBegetSettings

  constructor(s: TBegetSettings) {
    this.settings = s
  }

  async changeDns({ host, ip }: TDnsOpts) {
    const { login, pass } = this.settings

    const inputData = encodeURI(
      JSON.stringify({
        fqdn: host,
        records: {
          A: [{ priority: 10, value: ip }],
          MX: [
            { priority: 10, value: 'mx1.beget.com' },
            { priority: 20, value: 'mx2.beget.com' },
          ],
        },
      })
    )

    return await (
      await fetch(
        `https://api.beget.com/api/dns/changeRecords?login=${login}&passwd=${pass}&input_format=json&output_format=json&input_data=${inputData}`,
        {
          method: 'GET',
        }
      )
    ).text()
  }
}
