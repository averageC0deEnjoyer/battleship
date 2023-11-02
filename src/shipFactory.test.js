import shipFactory from "./shipFactory";


test("check getLength method",()=> {
    const ship4 = shipFactory("ship4", 4);
    expect(ship4.getLength()).toBe(4);
})

test("check getShipType method", ()=> {
    const ship4 = shipFactory("ship4", 4);
    expect(ship4.getShipType()).toBe("ship4")    
})

test("")