const data = require('./ow.json');

const getHeroes = () => {
    var heroes = [];

    for (var i = 0; i < data.names.length; i++) {
        heroes.push({
            name: data.names[i],
            role: data.roles[i]
        })
    }

    return heroes;
};

const groupBy = (heroes, propertyName = 'role') => {
    var heroesByRole = {};

    getPropertyValues(heroes, propertyName).forEach(function (heroPropertyValue) {
        heroesByRole[heroPropertyValue] = getByPropertyValue(heroes, propertyName, heroPropertyValue);
    })

    return heroesByRole;
};

const getPropertyValues = (heroes, property) => {
    var properties = [];
    heroes.map(x => x[property]).forEach(function (currentValue) {
        if(!properties.includes(currentValue)){
            properties.push(currentValue);
        }
    })

    return properties;
};

const getByRoles = (heroes, roleValue, secondRoleValue = null) => {
    return getByPropertyValue(heroes, 'role', roleValue).concat(getByPropertyValue(heroes, 'role', secondRoleValue));
};

const getByPropertyValue = (heroes, propertyName, value) => {
    return heroes.filter(hero => hero[propertyName] === value);
};

const makeHeroesNice = (heroes) => {
    heroes.forEach(addSayHelloFunction);

    return heroes;
};

const addSayHelloFunction = (hero) => {
    hero.sayHello = function () {
        console.log(`Hi! My name is ${this.name}, nice to meet you!`)
    };
};

console.log(getHeroes())
console.log(groupBy(getHeroes()));
console.log(groupBy(getHeroes(), 'name'));
console.log(getByRoles(getHeroes(), 'Offense'));
console.log(getByRoles(getHeroes(), 'Support', 'Offense'));
const niceHeroes = makeHeroesNice(getHeroes());
niceHeroes[0].sayHello();

