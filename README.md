# COTD:

a expo react native app that allows users to track what color they're associating with their day.

# TODO:

## immediate:

- [ ] Get the app submitted to the app store so can build in public
- [ ] Set up push notification using expo
- [ ] add an export feature that allows users to save their color data as a csv.
- [ ] find out why Context Provider is so so so slow (?) I am hoping that when running on actual hardware and not on simulator it will be much faster.

## Backlog:

- [ ] update the color picker package to use the new panel [convo here](https://github.com/alabsi91/reanimated-color-picker/issues/23#issuecomment-1485750840)

### UI improvements:

- [ ] UI overhaul with gradients everywhere
- [ ] Use midjourney to create custom image assets.
- [ ] give a button to allow summary to be presented in different views.
- [ ] consider that it might be cooler to just render a box that is a color starting in the upper left and just blends between the color. I could see that it takes up the whole view space and then as more colors get added, it will start to blend them together, so the first day it will take up the whole page, the second each color gets half, etc...
- [ ] add a custom view to the calendar that will allow me to blend between the colors

# DONE

- [x] change the summary screen to show all the calendar days in a scrollable fashion.
- [ ] Splash screen.

# Settings Page Todo:

- [ ] Ask how often they'd like push notifications, write the code to remind them once a day
