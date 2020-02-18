import * as subEvents from '../../subEvents';

export const testSub = (client, target, context, args, messageHandler) => {
    subEvents.newSubscriber("Test Subscription", messageHandler);
}