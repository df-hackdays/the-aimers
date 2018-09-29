let num_to_show = 0
let D_count = 0
let C_count = 0
let B_count = 0
let A_count = 0
let fast_count = 0
let slow_count = 0
let normal_count = 0
let button_A_state = 0
let button_B_state = 0
radio.setGroup(1)
serial.writeLine("started")

input.onButtonPressed(Button.A, () => {
    // starting questionaire
    if (button_A_state == 0) {
        radio.sendNumber(101)
        button_A_state = 1
		serial.writeLine("qastarted")
    } else {
        button_A_state = 0
        radio.sendNumber(100)
		serial.writeLine("Results " + "A" + A_count + "B" + B_count + "C" + C_count + "D" + D_count)
        // draw a graph with the A,B,C,D content
        A_count = 0
        B_count = 0
        C_count = 0
        D_count = 0
    }
})
radio.onDataPacketReceived(({ receivedNumber }) => {
    // Initial case
    if (receivedNumber == 9) {
        normal_count += 1
    }
    // Slow
    if (receivedNumber == 10) {
        slow_count += 1
        normal_count += -1
    }
    // Fast
    if (receivedNumber == 12) {
        fast_count += 1
        slow_count += -1
    }
    // normal
    if (receivedNumber == 11) {
        normal_count += 1
        fast_count += -1
    }
    if (receivedNumber == 21) {
        A_count += 1
    }
    if (receivedNumber == 22) {
        B_count += 1
    }
    if (receivedNumber == 23) {
        C_count += 1
    }
    if (receivedNumber == 24) {
        D_count += 1
    }
    num_to_show = fast_count - slow_count
    basic.showNumber(num_to_show)
    serial.writeLine("Pace " + num_to_show)
})

