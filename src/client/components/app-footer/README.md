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

| name | required | type | description |
| --- | --- | --- | --- |
| headerTitle | false | String | value that should display a slogan for the heading of the footer section |
| headerSubtitle | false | String | value that should display a text below the logo of the footer |
| tel | false | String | value of the telefoon number of de voorhoede |
| email | false | String | value of the email adress of de voorhoede |
| googleMapsLink | false | String | value that contains the Google Maps link of the location of de voorhoede |
| address | false | String | value of the street address to de voorhoede |
| postal code | false | String | value of the postal code of de voorhoede |
| copyright | false | String | value copyright of the voorhoede |
| legal | false | Array | this should show the kvk btw and iban number |
| social | false | Array | this hould show the social media icon and the link to the social media page |
