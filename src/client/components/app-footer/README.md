# App Footer
Used as a container to position components inside it.

## Usage

```html
<app-footer
	:headerTitle="headerTitle"
	:headerSubtitle="headerSubtitle"
	:tel="tel"
	:email="email"
	:googleMapsLink="googleMapsLink"
	:address="address"
	:postalCode="postalCode"
	:copyright="copyright"
	:legal="legal"
	:social="social
>
```

## Props

| name | required | type | Description |
| --- | --- | --- | --- |
| headerTitle | false | String | value that should display a slogan for the heading of the footer section |
| headerSubtitle | false | String | value that should display a text below the logo of the footer |
| tel | false | String | value of the telefoon number of De Voorhoede |
| email | false | String | value of the email adress of De Voorhoede |
| googleMapsLink | false | String | value that contains the Google Maps link of the location of De Voorhoede |
| address | false | String | value of the street address to De Voorhoede |
| postal code | false | String | value of the postal code of De Voorhoede |
| copyright | false | String | value copyright of De Voorhoede |
| legal | false | Array | this should show the kvk btw and iban number |
| social | false | Array | this hould show the social media icon and the link to the social media page |
