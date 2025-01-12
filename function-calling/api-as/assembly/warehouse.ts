import { JSON } from "json-as";

class Drug {
  availability: u32 = 0;
  price_per_unit: string = "";
  target: string = "";
  mechanism_of_action: string = "";
  phase: string = "";
  side_effects: string[] = [];
  pathways: string[] = [];
  chemical_structure: string = ""; // Added field for chemical structure
}

export function get_drug_list(): string {
  const drug_list = drugInfo.keys();
  return `The available drugs are: ${drug_list.join(", ")}`;
}

export function get_drug_info(string_args: string): string {
  const args = JSON.parse<GetDrugArguments>(string_args);

  if (!drugInfo.has(args.drug_name)) {
    return `The drug ${args.drug_name} is not available. ` + get_drug_list();
  }

  const drug = drugInfo.get(args.drug_name) as Drug;

  let value: string;

  if (args.attribute === "availability") {
    value = drug.availability.toString();
  } else if (args.attribute === "price_per_unit") {
    value = drug.price_per_unit;
  } else if (args.attribute === "target") {
    value = drug.target;
  } else if (args.attribute === "mechanism_of_action") {
    value = drug.mechanism_of_action;
  } else if (args.attribute === "phase") {
    value = drug.phase;
  } else if (args.attribute === "side_effects") {
    value = drug.side_effects.join(", ");
  } else if (args.attribute === "pathways") {
    value = drug.pathways.join(", ");
  } else if (args.attribute === "chemical_structure") {
    value = drug.chemical_structure;
  } else {
    return `Invalid attribute requested. Available attributes are: availability, price_per_unit, target, mechanism_of_action, phase, side_effects, pathways, chemical_structure.`;
  }

  return `The ${args.attribute} of ${args.drug_name} is ${value}. `;
}

@json
export class GetDrugArguments {
  drug_name: string = "";
  attribute: string = "";
}

const drugInfo: Map<string, Drug> = new Map<string, Drug>();


drugInfo.set("Aspirin", {
  availability: 500,
  price_per_unit: "0.10",
  target: "Cyclooxygenase (COX)",
  mechanism_of_action: "Inhibits COX enzymes to reduce inflammation and pain",
  phase: "Marketed",
  side_effects: ["Nausea", "Stomach pain", "Bleeding"],
  pathways: ["Inflammatory Response Pathway", "COX Inhibition Pathway"],
  chemical_structure: "CC(=O)OC1=CC=CC=C1C(=O)O",
});

drugInfo.set("Paracetamol", {
  availability: 1000,
  price_per_unit: "0.15",
  target: "Cyclooxygenase (COX)",
  mechanism_of_action: "Inhibits COX enzymes with a focus on COX-2 for pain relief",
  phase: "Marketed",
  side_effects: ["Liver damage (at high doses)", "Allergic reactions"],
  pathways: ["Pain Relief Pathway", "Fever Reduction Pathway"],
  chemical_structure: "CC(=O)NC1=CC=C(O)C=C1",
});

drugInfo.set("Ibuprofen", {
  availability: 750,
  price_per_unit: "0.20",
  target: "Cyclooxygenase (COX)",
  mechanism_of_action: "Non-selective COX inhibitor for pain and inflammation",
  phase: "Marketed",
  side_effects: ["Nausea", "Heartburn", "Dizziness"],
  pathways: ["Inflammatory Pathway", "Pain Inhibition Pathway"],
  chemical_structure: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
});

drugInfo.set("Metformin", {
  availability: 300,
  price_per_unit: "0.50",
  target: "AMP-activated protein kinase (AMPK)",
  mechanism_of_action: "Activates AMPK to reduce glucose production in the liver",
  phase: "Marketed",
  side_effects: ["Nausea", "Diarrhea", "Metallic taste"],
  pathways: ["Glucose Metabolism Pathway", "AMPK Activation Pathway"],
  chemical_structure: "CNC(N)=NCN",
});

drugInfo.set("Caffeine", {
  availability: 200,
  price_per_unit: "0.05",
  target: "Adenosine receptors",
  mechanism_of_action: "Blocks adenosine receptors to promote wakefulness",
  phase: "Marketed",
  side_effects: ["Insomnia", "Increased heart rate", "Restlessness"],
  pathways: ["Central Nervous System Activation Pathway"],
  chemical_structure: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
});

drugInfo.set("Simvastatin", {
  availability: 500,
  price_per_unit: "0.30",
  target: "HMG-CoA reductase",
  mechanism_of_action: "Inhibits HMG-CoA reductase to lower cholesterol",
  phase: "Marketed",
  side_effects: ["Muscle pain", "Headache", "Abdominal pain"],
  pathways: ["Cholesterol Biosynthesis Pathway"],
  chemical_structure: "CC(C)C1=CC=C(C=C1)C(C)C(=O)OC(C)CC(C)=C",
});

drugInfo.set("Atorvastatin", {
  availability: 400,
  price_per_unit: "0.40",
  target: "HMG-CoA reductase",
  mechanism_of_action: "Inhibits HMG-CoA reductase to lower LDL cholesterol",
  phase: "Marketed",
  side_effects: ["Muscle pain", "Liver enzyme changes", "Digestive issues"],
  pathways: ["Lipid Metabolism Pathway"],
  chemical_structure: "CC(C)C1=CC=C(C=C1)C(C)C(=O)OC(CC(C)C)CC2=CC=CC=C2C",
});

drugInfo.set("Amoxicillin", {
  availability: 300,
  price_per_unit: "0.25",
  target: "Bacterial cell wall synthesis",
  mechanism_of_action: "Inhibits bacterial cell wall synthesis",
  phase: "Marketed",
  side_effects: ["Rash", "Diarrhea", "Nausea"],
  pathways: ["Antibacterial Pathway"],
  chemical_structure: "CC1(C(=O)NC(C(=O)N2CCC(CC2)C3=CC=CC=C3)C1O)C",
});

drugInfo.set("Clopidogrel", {
  availability: 200,
  price_per_unit: "0.45",
  target: "P2Y12 receptor",
  mechanism_of_action: "Inhibits platelet aggregation by blocking P2Y12 receptor",
  phase: "Marketed",
  side_effects: ["Bleeding", "Itching", "Headache"],
  pathways: ["Platelet Aggregation Inhibition Pathway"],
  chemical_structure: "CC(C)C1=CC=C(C=C1)C2=CC(=C(C=C2)C(C)OC(=O)OCC3=CC=CC=C3)C",
});

drugInfo.set("Losartan", {
  availability: 600,
  price_per_unit: "0.35",
  target: "Angiotensin II receptor",
  mechanism_of_action: "Blocks angiotensin II receptor to lower blood pressure",
  phase: "Marketed",
  side_effects: ["Dizziness", "Fatigue", "Back pain"],
  pathways: ["Blood Pressure Regulation Pathway"],
  chemical_structure: "CC1=CC=C(C=C1)C(=O)NCCC2=C(C=CC=C2)C(=O)OC",
});

drugInfo.set("Rosuvastatin", {
  availability: 350,
  price_per_unit: "0.50",
  target: "HMG-CoA reductase",
  mechanism_of_action: "Inhibits HMG-CoA reductase to lower cholesterol",
  phase: "Marketed",
  side_effects: ["Muscle pain", "Constipation", "Abdominal pain"],
  pathways: ["Cholesterol Synthesis Inhibition Pathway"],
  chemical_structure: "CC(C)(C)C1=CC=C(C=C1)C(C)C(=O)OC(CC(C)C)CC2=CC=CC=C2C",
});

drugInfo.set("Omeprazole", {
  availability: 400,
  price_per_unit: "0.20",
  target: "Proton pump",
  mechanism_of_action: "Inhibits proton pump to reduce stomach acid production",
  phase: "Marketed",
  side_effects: ["Headache", "Nausea", "Diarrhea"],
  pathways: ["Gastric Acid Secretion Inhibition Pathway"],
  chemical_structure: "COC1=CC2=C(NC(=O)OC2=N1)C3=CC=CC=C3",
});

drugInfo.set("Levothyroxine", {
  availability: 700,
  price_per_unit: "0.10",
  target: "Thyroid hormone receptors",
  mechanism_of_action: "Replaces or supplements thyroid hormone",
  phase: "Marketed",
  side_effects: ["Hair loss", "Sweating", "Palpitations"],
  pathways: ["Thyroid Hormone Regulation Pathway"],
  chemical_structure: "CC1=CC=CC=C1C(C)C(=O)NCC(C(=O)O)CC(=O)O",
});

drugInfo.set("Warfarin", {
  availability: 150,
  price_per_unit: "0.60",
  target: "Vitamin K epoxide reductase",
  mechanism_of_action: "Inhibits vitamin K epoxide reductase to prevent clot formation",
  phase: "Marketed",
  side_effects: ["Bleeding", "Nausea", "Fatigue"],
  pathways: ["Coagulation Inhibition Pathway"],
  chemical_structure: "CC(=O)C1=C(O)C=C(C=C1)C(=O)O",
});


