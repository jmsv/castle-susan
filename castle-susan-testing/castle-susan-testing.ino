#include <RedBot.h>
#include <RedBotSoftwareSerial.h>

#define BEEPER 10

RedBotMotors motor;

void setup() {
  Serial.begin(9600);
  Serial.print("starting");

  motor.stop();
  // emergency stop below
  // return;

  annoying_noise();

  // uncomment below to stop drawbridge up/down
  return;

  drawb_down();
  delay(2000);
  drawb_up();
}

void loop() {
  while (Serial.available() > 0) {
    char cmd = Serial.read();

    Serial.print(cmd);
    Serial.print("\n");

    switch (cmd) {
      case 'b':
        annoying_noise();
      case 'u':
        drawb_up();
        break;
      case 'd':
        drawb_down();
        break;
    }
  }
}



void annoying_noise() {
  for (int i = 9000; i > 99; i -= 30) {
    tone(BEEPER, i, 5);
    delay(3);
  }
  for (int i = 100; i < 6000; i += 10) {
    tone(BEEPER, i, 800);
    delay(5);
  }
}

void drawb_down() {
  motor.drive(-255);
  delay(2800);
  motor.stop();
}

void drawb_up() {
  motor.drive(255);
  delay(2800);
  motor.stop();
}
