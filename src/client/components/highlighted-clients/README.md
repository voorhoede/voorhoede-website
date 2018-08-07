# Highlighted Clients


## Usage

```html
<highlighted-clients
  :clients="[
    { logoSrc: '/client-logos/olx.svg', name: 'OLX' },
    { logoSrc: '/client-logos/loop.svg', name: 'Delft Hyperloop' },
    { logoSrc: '/client-logos/funda.svg', name: 'Funda' },
    { logoSrc: '/client-logos/npo.svg', name: 'NPO' },
    { logoSrc: '/client-logos/abn-amro.svg', name: 'ABN AMRO' },
    { logoSrc: '/client-logos/hotelspecials.svg', name: 'HotelSpecials' },
    { logoSrc: '/client-logos/2dehands.svg', name: '2dehands.be' },
    { logoSrc: '/client-logos/ziggo.svg', name: 'Ziggo' },
    { logoSrc: '/client-logos/sita.svg', name: 'Sita' },
    { logoSrc: '/client-logos/trouw.svg', name: 'Trouw' },
    { logoSrc: '/client-logos/hva.svg', name: 'Hogeschool van Amsterdam' },
    { logoSrc: '/client-logos/grandvision.svg', name: 'GrandVision' }
  ]"
/>
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
