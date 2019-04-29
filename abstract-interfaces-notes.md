
```typescript
type FuelType = 'gasoline' | 'hydrogen' | 'diesel'

interface IFuel {
  fuelType: FuelType;
  amountInGallons: number;
}

abstract class Car {
  public color: string;

  public constructor (color: string) {
    this.color = color;
  }

  public moveForward (speed: number): void {

  }

  public moveBackward (speed: number): void {

  }

  abstract refuel(gas?: IFuel): void;
}

class Tesla extends Car {

  refuel (): void {
    // fuel it up by going to a recharge station
  }

}

class Gasoline implements IFuel {
  public fuelType: FuelType = 'gasoline'
  public amountInGallons: number;

  constructor (gallons: number) {
    this.amountInGallons = gallons;
  }
}

class Honda extends Car {

  refuel (gas?: Gasoline): void {
    // maybe add this to the gas tank (another abstraction)
  }
}

const t = new Tesla('blue');
const h = new Honda('green');

t.moveForward(10);
t.moveBackward(10);

h.moveForward(10);


h.moveBackward(10);

class ParkingMeterService {
  public static reportTicketFor (car: Car) : ITicket {

  }
}
```
