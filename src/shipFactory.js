export default function shipFactory(type, length) {
  let shipHit = 0;
  const resetShipState = () => {
    shipHit = 0;
  };
  const getShipType = () => type;
  const getLength = () => length;
  const hit = () => {
    shipHit += 1;
  };
  const isSunk = () => {
    if (shipHit === length) {
      return true;
    }
    return false;
  };
  return {
    resetShipState,
    getShipType,
    getLength,
    hit,
    isSunk,
    get health() {
      return this.length - this.shipHit;
    },
  };
}
