# Capitals coordinates

## rawData

```
const coordinates = require('capitals-coordinates').rawData;
```
`coordinates` is array of [GeoJSON objects](http://geojson.org/) sorted by country name in English. Example GeoJSON object:

```
{
     "type": "Feature",
     "geometry": {
      "type": "Point",
      "coordinates": [
       31.05,
       -17.83
      ]
     },
     "properties": {
      "capital": "Harare",
      "country": "Zimbabwe",
      "continent": "africa"
     }
    }
```





### Continents

Possible values for `continent`: `['north-america', 'oceania', 'south-america', 'europe', 'asia', 'africa']`.

## findByCountryMatch(regexp)

```
const countries = require('capitals-coordinates').findByCountryMatch(/and/i); // array of GeoJSON with `properties`
```

## findByContinent

```
const africanCountries = require('capitals-coordinates').findByContinent('africa');
```


# Why did you make it?

We use this module to discover countries supported by various API - eg. we are working application working with AwesomeHotelBookings .
They claim to provide hotel booking "Europe-wide", though they lie - they don't provide such services in Norway, so we won't advertise app in Norway.