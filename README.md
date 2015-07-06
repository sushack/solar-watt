# :sunny:solar-watt:sunny:

Aims for this hack...

- As a user, I want to know when it is ok for me to turn on my various electrical appliances.
- The hack will provide a web page showing
 - Predicted Solar Generation, based on
   - Time of day
    - Cloud Cover
 - Which appliances are safe to turn on based on
   - How long they run for
    - Their power usage

So, the tumble dryer takes 2 hours and uses 1500W.  If the prediction for the next two hours is for less than 1500W/h the dryer icon will be red.

If the prediction is >= 1500W/h then the icon will be green.

## Get Started
- Checkout
- npm install
- gulp
- http://localhost:3000
 
## Expansions
- Read the current power draw, remove it from the prediction
- Track the actual output, use it to inform future/current predictions
- Set up a device that actually uses the prediction to decide when to turn on
- Cache wunderground and other API feeds to stop angry overuse emails
