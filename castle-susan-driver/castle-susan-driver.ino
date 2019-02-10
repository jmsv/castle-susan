#include <RedBot.h>
#include <RedBotSoftwareSerial.h>

#define BEEPER 10

RedBotMotors motor;

void setup() {
  motor.stop();
  // emergency stop: uncomment below
  // return;

  Serial.begin(9600);
  Serial.print("started serial server");

  annoying_noise();
  ok();
}

void loop() {
  while (Serial.available() > 0) {
    process_cmd();
  }
}

void process_cmd() {
  char cmd = Serial.read();

  Serial.print("\n");
  Serial.print(cmd);

  switch (cmd) {
    // Drawbridge up and down
    case 'u':
      drawb_up(); break;
    case 'd':
      drawb_down(); break;

    // Drawbridge calibrate
    case '+':
      drawb_calibrate(1); break;
    case '-':
      drawb_calibrate(-1); break;

    // Buzzer sounds
    case 'k':
      ok(); break;
    case 'b':
      annoying_noise(); break;
  }
}


void drawb_calibrate(int sign) {
  motor.drive(sign * 100);
  delay(100);
  motor.stop();
}

void drawb_down() {
  motor.drive(-255);
  delay(2700);
  motor.stop();
}

void drawb_up() {
  motor.drive(255);
  delay(2800);
  motor.stop();
}

void annoying_noise() {
  // return; // shut up
  for (int i = 9000; i > 99; i -= 30) {
    tone(BEEPER, i, 5);
    delay(3);
  }
  for (int i = 100; i < 6000; i += 10) {
    tone(BEEPER, i, 800);
    delay(5);
  }
}

void ok() { // weird noise thing
  tone(BEEPER, 2000, 150);
}

void unknown_cmd() {
  tone(BEEPER, 4000, 1500);
}
