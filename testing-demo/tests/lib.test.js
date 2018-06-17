
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('Absolute',()=>{

    it('should return positive number if input is positive',() =>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return positive number if input is negative',() =>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return zero if input is zero',() =>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });

});

describe('greet',()=>{

    it('should return welcome greet ',()=>{
        const result = lib.greet('Rahul Razdan');
        expect(result).toMatch(/Rahul Razdan/);
    })
});

describe('getCurrencies',()=>{

    it('should return supported currencies',()=>{
        const result = lib.getCurrencies();
        expect(result).toContain('USD');
        expect(result).toEqual(expect.arrayContaining(['EUR','USD','AUD']));
    })
});

describe('getProduct',()=>{

    it('should return product for given product id',()=>{
        const result = lib.getProduct(1);
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty('id', 1);
    })
});

describe('registerUser',()=>{

    it('should throw error if no username',()=>{
        const args = [null,undefined , NaN , '', 0 ,false];
        args.forEach(a=>{
            expect(()=> { lib.registerUser(a) }).toThrow();
        });
       
    });

    it('should give object with given username',()=>{
        const result = lib.registerUser('rahul');
        expect(result).toMatchObject({username: 'rahul'});
        expect(result).toHaveProperty('username', 'rahul');
        expect(result.id).toBeGreaterThan(0);
    })
});

describe('applyDiscount', () => {

    db.getCustomerSync = function(id){
        console.log('Fake customer reading..');
        return { id: id, points: 11 };
    }
    it('should apply discount if customer has more than 10 points',()=>{
        const order = {customerId : 1 , totalPrice:10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notify Customer ',()=>{
    mail.send = jest.fn();
    it('should send mail to cusotmer if found',()=>{
        lib.notifyCustomer({customerId : 1 , totalPrice:10});
        expect(mail.send).toHaveBeenCalled();
    });
});

describe('notify Customer mock objects',()=>{
    
    db.getCustomerSync = jest.fn().mockReturnValue({
        email: 'a' , points : 11
    });

    mail.send = jest.fn();
    
    it('should send mail to cusotmer if found',()=>{
        lib.notifyCustomer({customerId : 1 , totalPrice:10});
        expect(mail.send).toHaveBeenCalled();
    });
});