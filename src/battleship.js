export function ship(length){
    let hits = 0;

    function hit(){
        if(hits < length){
            hits ++;
        };
    }
    function isSunk(){
        return (hits >= length);
        }
    
        return{
            length,
            hit,
            isSunk,
            get hits(){
                return hits;
            }
        };
}