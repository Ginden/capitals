var fs = require('fs');
function fromCallback(fn) {
    const args = [].slice.call(arguments,1);
    const that = this;
    return new Promise(function (resolve, reject) {
        fn.apply(that, args.concat(function(err, res){
            if (err) return reject(err);
            resolve(res);
        }));
    });
}

const continents = ['north-america', 'oceania', 'south-america', 'europe', 'asia', 'africa']
    .map(continent=>{
        const fileName = continent+'.json';
        return fromCallback(fs.readFile, fileName, 'utf8').then(JSON.parse).then(countries=>({continent, countries}))
    });

/*

 document.body.textContent = JSON.stringify(
 Array.from(document.querySelectorAll('.table-hover > tbody:nth-child(2) > tr')).map(e=>{
 const [,country, capital, lat, long] = Array.from(e.querySelectorAll('td'), e=>e.textContent);
 return {country, capital, lat: Number(lat.replace(',', '.')), long: Number(long.replace(',', '.'))}
 }).map(({country, capital, lat, long}) => ({
 type: 'Feature',
 "geometry": {
 "type": "Point",
 "coordinates": [long, lat]
 },
 "properties": {
 capital, country
 }
 })),
 null, 1)
 */

const allCountries = Promise.all(continents).then((continents)=>{
    const allCountries = [].concat.apply([], continents.map(({continent, countries})=>{
        countries.forEach(c=>c.properties.continent = continent);
        return countries;
    }));
    return allCountries.sort((a,b)=>a.properties.country.localeCompare(b.properties.country));
});

const indexSource = fromCallback(fs.readFile, 'index.source.js', 'utf8');

Promise.all([indexSource, allCountries]).then(([indexSource, allCountries])=>{
    return indexSource.replace('$$$JSON_PLACEHOLDER$$$', JSON.stringify(allCountries, null, 1));
}).then(result=>fromCallback(fs.writeFile, 'index.js', result));
