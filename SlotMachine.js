var SlotMachineSymbols = ["Stern", "Herz", "Kirsche", "Joker", "Herz", "Kirsche", "Reingeguckt"];
var Guthaben = 0;
var Result = [];
function AddGuthaben() {
  Guthaben += 10;
  document.getElementById("Guthaben").innerHTML = "Aktuelles Guthaben: " + Guthaben + "�";
}
function Spin() {
  Result = [];
  for (var i = 0; i < 3; i++) {
    var SlotNumber = Math.floor(Math.random() * SlotMachineSymbols.length)
    Result.push(SlotMachineSymbols[SlotNumber])
    document.getElementById("Slots").innerHTML = Result;
  }
}
