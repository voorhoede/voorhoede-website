# Highlighted Clients


## Usage

```html
<highlighted-clients :clients="[
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495070-logo-olx.svg', name: 'OLX' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495095-logo-hyperloop.svg', name: 'Delft Hyperloop' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495094-logo-funda.svg', name: 'Funda' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495096-logo-npo.svg', name: 'NPO' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495144-logo-abn.svg', name: 'ABN AMRO' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495145-logo-hotelspecials.svg', name: 'HotelSpecials' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495143-logo-2dehands.svg', name: '2dehands.be' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495147-logo-ziggo.svg', name: 'Ziggo' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495146-logo-sita.svg', name: 'Sita' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495147-logo-trouw.svg', name: 'Trouw' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495146-logo-hva.svg', name: 'Hogeschool van Amsterdam' },
  { logoSrc: 'https://www.datocms-assets.com/2850/1529495144-logo-grandvision.svg', name: 'GrandVision' }
]"/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| clients | Array | true | Array of clients |

The Array of clients must have a length of 12 clients. Each client is an object with the following properties:

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| logoSrc | String | true | src of the logo |
| name | String | true | Name of the client |
