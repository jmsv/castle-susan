#include <RedBot.h>
#include <RedBotSoftwareSerial.h>

#define BEEPER 10

RedBotMotors motor;

void setup() {
  motor.stop();
  // emergency stop below
  //return;

  start_sound();

  // uncomment below to stop drawbridge up/down
  return;

  drawb_down();
  delay(2000);
  drawb_up();
}

void loop() {

}


// ----------


void start_sound() {
  for (int i = 9000; i > 99; i-=30) {
    tone(BEEPER, i, 5);
    delay(3);
  }
  for (int i = 100; i < 6000; i+=10) {
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
