radio.onDataPacketReceived(({ receivedNumber }) => {
    if (receivedNumber == 911) {
        basic.showIcon(IconNames.Heart)
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showIcon(IconNames.Happy)
})
radio.setGroup(1)
basic.showIcon(IconNames.Happy)

