# App Footer
Used as a Container to position components inside it.

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
| name | required | description |
| --- | --- | --- |
| headerTitle | false | String value that should display a slogan for the heading of the footer section |
| headerSubtitle | false | String value that should display a text below the logo of the footer |
| tel | false | String value of the telefoon number of de voorhoede |
| email | false | String value of the email adress of de voorhoede |
| googleMapsLink | false | a String value that contains the Google Maps link of the location of de voorhoede |
| address | false | string value of the street address to de voorhoede |
| postal code | false | string value of the postal code of de voorhoede |
| copyright | false | string value copyright of the voorhoede |
| kvk | false | string value kvk number |
| btw | false | string value btw number |
| iban | false | string value iban number |
