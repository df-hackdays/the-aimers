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
serial.writeLine("Started")
input.onButtonPressed(Button.A, () => {
    // starting questionaire
    if (button_A_state == 0) {
        radio.sendNumber(101)
        button_A_state = 1
    } else {
        button_A_state = 0
        radio.sendNumber(100)
        serial.writeNumber(A_count)
        serial.writeNumber(B_count)
        serial.writeNumber(C_count)
        serial.writeNumber(D_count)
        // draw a graph with the A,B,C,D content
        A_count = 0
        B_count = 0
        C_count = 0
        D_count = 0
    }
})
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
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
    serial.writeNumber(num_to_show)
})
button_B_state = 0
radio.setGroup(1)
