import { heroes } from '../data/heroes';

export const callbacksComponent = ( element ) => {
    
    const id1 = '5d86371f25a058e5b1c8a65e';
    const id2 = '5d86371fd55e2e2a30fe1ccb';

    findHero( id1, (err, hero1) => {
        // element.innerHTML = hero?.name || 'No hay heroe';
        if ( err ) {
            element.innerHTML = err;
            return;
        }

        findHero( id2, (err, hero2) => {
            if ( err ) {
                element.innerHTML = err;
                return;
            }
            element.innerHTML = `${hero1.name} / ${hero2.name}`;
        })
    });
    
};

const findHero = (id, callback) => {
    
    const hero = heroes.find( hero => hero.id === id);

    if ( !hero) {
        callback(`Hero with id ${ id } not found.`);
        return; // undefined;
    }
    callback( null, hero );
}