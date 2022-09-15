interface Observer {
  next: (value: any) => void;
  error: (err: any) => void;
  complete: () => void;
}

type Teardown = () => void;

const observer = {
  next: (value: any) => console.log('next:', value),
  error: (err: any) => console.log('next:', err),
  complete: () => console.log('complete'),
};

//observer.next('Hello World');
//observer.error('Hello World');
//observer.complete();

class Observable {
  subscriber: (observer: Observer) => Teardown;
  constructor(subscriber: (observer: Observer) => Teardown) {
    this.subscriber = subscriber;
  }
  subscribe(observer: Observer) {
    //let i = 0;
    //const index = setInterval(() => observer.next(i++), 1000);
    //const teardown: Teardown = () => clearInterval(index);
    const teardown: Teardown = this.subscriber(observer);
    return {
      unsubscribe: () => teardown(),
    };
  }
}

//function source(observer: Observer) {
//  let i = 0;
//  const index = setInterval(() => observer.next(i++), 1000);
//  const teardown = () => clearInterval(index);
//  return {
//    unsubscribe:() => teardown()
//  }
//}

function Interval(milisec: number) {
  return new Observable((observer) => {
    let i = 0;
    const index = setInterval(() => observer.next(i++), 1000);
    const teardown = () => clearInterval(index);
    return teardown;
  });
}

function of(...dataList: any[]) {
  return new Observable((observer) => {
    dataList.forEach((data) => observer.next(data));
    observer.complete();
    return () => {};
  });
}

function from(dataList: any[]) {
  return new Observable((observer) => {
    dataList.forEach((data) => observer.next(data));
    observer.complete();
    return () => {};
  });
}

//const source = Interval(2000);
//const source = of(10, 20, 30, 40);
const source = from(['banana', 'old-banana', 'apple']);
const subscription = source.subscribe(observer);
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
