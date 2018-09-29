
radio.onDataPacketReceived(({ receivedNumber }) => {
    if (receivedNumber == 911) {
        basic.showIcon(IconNames.Heart)
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`
    # . . . #
    # # . # #
    # . # . #
    # . # . #
    # . . . #
    `)
})
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    # # . # #
    # . # . #
    # . # . #
    # . . . #
    `)
