radio.setGroup(1)
let button_B_state = 0
let button_A_state = 0
let slow_count = 0
let fast_count = 0
let normal_count = 0

input.onButtonPressed(Button.A, () => {
    // starting questionaire
    if (button_A_state == 0) {
        radio.sendNumber(101)
        button_A_state = 1
    } else {
        button_A_state = 0
        radio.sendNumber(100)
    }
})
radio.onDataPacketReceived(({ receivedNumber }) => {

    //Initial case

    if (receivedNumber == 9) {
        normal_count++
    }
    //Slow
    if (receivedNumber == 10) {
        slow_count++
        normal_count--
    }
    //Fast
    else if (receivedNumber == 12) {
        fast_count++
        slow_count--
    }

    // normal
    else if (receivedNumber == 11) {
        normal_count++
        fast_count--
    }

    let num_to_show = fast_count - slow_count
    basic.showNumber(num_to_show)
    serial.writeNumber(num_to_show)
})


