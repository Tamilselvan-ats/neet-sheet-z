export interface Topic {
  id: string;
  name: string;
  youtubeUrl?: string;
  ncertUrl?: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface SubjectSyllabus {
  class11: Chapter[];
  class12: Chapter[];
}

export const neetSyllabus: Record<string, SubjectSyllabus> = {
  physics: {
    class11: [
      {
        id: "p11_01",
        name: "Units and Measurements",
        topics: [
          { id: "p11_01_01", name: "Units of measurement; systems of units" },
          { id: "p11_01_02", name: "SI units, fundamental and derived units" },
          { id: "p11_01_03", name: "Significant figures" },
          { id: "p11_01_04", name: "Dimensions of physical quantities, dimensional analysis" }
        ]
      },
      {
        id: "p11_02",
        name: "Kinematics",
        topics: [
          { id: "p11_02_01", name: "Frame of reference, Motion in a straight line" },
          { id: "p11_02_02", name: "Elementary concepts of differentiation and integration" },
          { id: "p11_02_03", name: "Scalar and vector quantities" },
          { id: "p11_02_04", name: "Projectile motion" },
          { id: "p11_02_05", name: "Uniform circular motion" }
        ]
      },
      {
        id: "p11_03",
        name: "Laws of Motion",
        topics: [
          { id: "p11_03_01", name: "Newton's first law of motion; momentum and Newton's second law" },
          { id: "p11_03_02", name: "Impulse; Newton's third law of motion" },
          { id: "p11_03_03", name: "Law of conservation of linear momentum" },
          { id: "p11_03_04", name: "Equilibrium of concurrent forces" },
          { id: "p11_03_05", name: "Static and kinetic friction, laws of friction" }
        ]
      },
      {
        id: "p11_04",
        name: "Work, Energy and Power",
        topics: [
          { id: "p11_04_01", name: "Work done by a constant force and a variable force" },
          { id: "p11_04_02", name: "Kinetic energy, work-energy theorem, power" },
          { id: "p11_04_03", name: "Potential energy, conservative forces" },
          { id: "p11_04_04", name: "Conservation of mechanical energy" }
        ]
      },
      {
        id: "p11_05",
        name: "Motion of System of Particles and Rigid Body",
        topics: [
          { id: "p11_05_01", name: "Centre of mass of a two-particle system" },
          { id: "p11_05_02", name: "Momentum conservation and centre of mass motion" },
          { id: "p11_05_03", name: "Moment of a force, torque, angular momentum" },
          { id: "p11_05_04", name: "Moment of inertia, radius of gyration" }
        ]
      },
      {
        id: "p11_06",
        name: "Gravitation",
        topics: [
          { id: "p11_06_01", name: "Kepler's laws of planetary motion" },
          { id: "p11_06_02", name: "Universal law of gravitation" },
          { id: "p11_06_03", name: "Acceleration due to gravity and its variation" },
          { id: "p11_06_04", name: "Gravitational potential energy; gravitational potential" },
          { id: "p11_06_05", name: "Escape velocity, Orbital velocity of a satellite" }
        ]
      },
      {
        id: "p11_07",
        name: "Properties of Bulk Matter",
        topics: [
          { id: "p11_07_01", name: "Elastic behaviour, Stress-strain relationship" },
          { id: "p11_07_02", name: "Hooke's law, Young's modulus, bulk modulus" },
          { id: "p11_07_03", name: "Pressure due to a fluid column; Pascal's law" },
          { id: "p11_07_04", name: "Viscosity, Stokes' law, terminal velocity" },
          { id: "p11_07_05", name: "Surface tension, angle of contact" }
        ]
      },
      {
        id: "p11_08",
        name: "Thermodynamics",
        topics: [
          { id: "p11_08_01", name: "Thermal equilibrium and definition of temperature" },
          { id: "p11_08_02", name: "First law of thermodynamics" },
          { id: "p11_08_03", name: "Isothermal and adiabatic processes" },
          { id: "p11_08_04", name: "Second law of thermodynamics" }
        ]
      },
      {
        id: "p11_09",
        name: "Kinetic Theory of Gases",
        topics: [
          { id: "p11_09_01", name: "Equation of state of a perfect gas" },
          { id: "p11_09_02", name: "Kinetic interpretation of temperature" },
          { id: "p11_09_03", name: "Degrees of freedom, law of equi-partition of energy" }
        ]
      },
      {
        id: "p11_10",
        name: "Oscillations and Waves",
        topics: [
          { id: "p11_10_01", name: "Periodic motion - time period, frequency" },
          { id: "p11_10_02", name: "Simple harmonic motion (S.H.M) and its equation" },
          { id: "p11_10_03", name: "Transverse and longitudinal waves" },
          { id: "p11_10_04", name: "Displacement relation for a progressive wave" },
          { id: "p11_10_05", name: "Doppler effect" }
        ]
      }
    ],
    class12: [
      {
        id: "p12_01",
        name: "Electrostatics",
        topics: [
          { id: "p12_01_01", name: "Electric Charges; Conservation of charge, Coulomb's law" },
          { id: "p12_01_02", name: "Electric field, electric field lines" },
          { id: "p12_01_03", name: "Electric flux, Gauss's theorem" },
          { id: "p12_01_04", name: "Electric potential, potential difference" },
          { id: "p12_01_05", name: "Capacitors and capacitance, combination of capacitors" }
        ]
      },
      {
        id: "p12_02",
        name: "Current Electricity",
        topics: [
          { id: "p12_02_01", name: "Electric current, drift velocity, Ohm's law" },
          { id: "p12_02_02", name: "Electrical resistance, V-I characteristics" },
          { id: "p12_02_03", name: "Internal resistance of a cell, potential difference and emf" },
          { id: "p12_02_04", name: "Kirchhoff's laws and simple applications" },
          { id: "p12_02_05", name: "Wheatstone bridge, metre bridge" }
        ]
      },
      {
        id: "p12_03",
        name: "Magnetic Effects of Current and Magnetism",
        topics: [
          { id: "p12_03_01", name: "Biot - Savart law and its application" },
          { id: "p12_03_02", name: "Ampere's law and its applications" },
          { id: "p12_03_03", name: "Force on a moving charge in uniform magnetic and electric fields" },
          { id: "p12_03_04", name: "Magnetic dipole and magnetic dipole moment" },
          { id: "p12_03_05", name: "Para-, dia- and ferro - magnetic substances" }
        ]
      },
      {
        id: "p12_04",
        name: "Electromagnetic Induction and Alternating Currents",
        topics: [
          { id: "p12_04_01", name: "Electromagnetic induction; Faraday's laws, induced emf and current" },
          { id: "p12_04_02", name: "Lenz's Law, Eddy currents. Self and mutual induction" },
          { id: "p12_04_03", name: "Alternating currents, peak and rms value of alternating current/voltage" },
          { id: "p12_04_04", name: "LC oscillations, LCR series circuit, resonance" },
          { id: "p12_04_05", name: "AC generator and transformer" }
        ]
      },
      {
        id: "p12_05",
        name: "Electromagnetic Waves",
        topics: [
          { id: "p12_05_01", name: "Electromagnetic waves and their characteristics" },
          { id: "p12_05_02", name: "Electromagnetic spectrum" }
        ]
      },
      {
        id: "p12_06",
        name: "Optics",
        topics: [
          { id: "p12_06_01", name: "Reflection of light, spherical mirrors, mirror formula" },
          { id: "p12_06_02", name: "Refraction of light, total internal reflection" },
          { id: "p12_06_03", name: "Refraction at spherical surfaces, lenses, thin lens formula" },
          { id: "p12_06_04", name: "Optical instruments: Microscopes and astronomical telescopes" },
          { id: "p12_06_05", name: "Wave optics: wavefront and Huygens' principle" },
          { id: "p12_06_06", name: "Interference, Young's double slit experiment" }
        ]
      },
      {
        id: "p12_07",
        name: "Dual Nature of Matter and Radiation",
        topics: [
          { id: "p12_07_01", name: "Dual nature of radiation, Photoelectric effect" },
          { id: "p12_07_02", name: "Hertz and Lenard's observations; Einstein's photoelectric equation" },
          { id: "p12_07_03", name: "Matter waves-wave nature of particles, de Broglie relation" }
        ]
      },
      {
        id: "p12_08",
        name: "Atoms and Nuclei",
        topics: [
          { id: "p12_08_01", name: "Alpha-particle scattering experiment; Rutherford's model of atom" },
          { id: "p12_08_02", name: "Bohr model, energy levels, hydrogen spectrum" },
          { id: "p12_08_03", name: "Composition and size of nucleus, atomic masses, isotopes" },
          { id: "p12_08_04", name: "Radioactivity, alpha, beta and gamma particles/rays" },
          { id: "p12_08_05", name: "Mass-energy relation, mass defect; nuclear fission and fusion" }
        ]
      },
      {
        id: "p12_09",
        name: "Electronic Devices",
        topics: [
          { id: "p12_09_01", name: "Energy bands in solids, conductors, insulators and semiconductors" },
          { id: "p12_09_02", name: "Semiconductor diode: I-V characteristics in forward and reverse bias" },
          { id: "p12_09_03", name: "Diode as a rectifier; I-V characteristics of LED, photodiode, solar cell" }
        ]
      }
    ]
  },
  chemistry: {
    class11: [
      {
        id: "c11_01",
        name: "Some Basic Concepts of Chemistry",
        topics: [
          { id: "c11_01_01", name: "General Introduction: Importance and scope of chemistry" },
          { id: "c11_01_02", name: "Laws of chemical combination, Dalton's atomic theory" },
          { id: "c11_01_03", name: "Atomic and molecular masses. Mole concept and molar mass" },
          { id: "c11_01_04", name: "Stoichiometry and calculations based on stoichiometry" }
        ]
      },
      {
        id: "c11_02",
        name: "Structure of Atom",
        topics: [
          { id: "c11_02_01", name: "Atomic number, isotopes and isobars" },
          { id: "c11_02_02", name: "Shells and subshells, dual nature of matter and light" },
          { id: "c11_02_03", name: "De Broglie's relationship, Heisenberg uncertainty principle" },
          { id: "c11_02_04", name: "Orbitals, quantum numbers, shapes of s, p and d orbitals" },
          { id: "c11_02_05", name: "Aufbau principle, Pauli exclusion principle and Hund's rule" }
        ]
      },
      {
        id: "c11_03",
        name: "Classification of Elements and Periodicity in Properties",
        topics: [
          { id: "c11_03_01", name: "Modern periodic law and long form of periodic table" },
          { id: "c11_03_02", name: "Periodic trends in properties of elements" }
        ]
      },
      {
        id: "c11_04",
        name: "Chemical Bonding and Molecular Structure",
        topics: [
          { id: "c11_04_01", name: "Valence electrons, ionic bond, covalent bond" },
          { id: "c11_04_02", name: "Lewis structure, polar character of covalent bond" },
          { id: "c11_04_03", name: "VSEPR theory, concept of hybridization" },
          { id: "c11_04_04", name: "Molecular orbital theory of homonuclear diatomic molecules" }
        ]
      },
      {
        id: "c11_05",
        name: "Chemical Thermodynamics",
        topics: [
          { id: "c11_05_01", name: "Concepts of system, types of systems, surroundings" },
          { id: "c11_05_02", name: "First law of thermodynamics - internal energy and enthalpy" },
          { id: "c11_05_03", name: "Hess's law of constant heat summation" },
          { id: "c11_05_04", name: "Introduction of entropy as a state function" },
          { id: "c11_05_05", name: "Gibbs energy change for spontaneous and non-spontaneous process" }
        ]
      },
      {
        id: "c11_06",
        name: "Equilibrium",
        topics: [
          { id: "c11_06_01", name: "Equilibrium in physical and chemical processes" },
          { id: "c11_06_02", name: "Law of chemical equilibrium, equilibrium constant" },
          { id: "c11_06_03", name: "Le Chatelier's principle" },
          { id: "c11_06_04", name: "Ionic equilibrium - ionization of acids and bases" },
          { id: "c11_06_05", name: "Solubility product, common ion effect" }
        ]
      },
      {
        id: "c11_07",
        name: "Redox Reactions",
        topics: [
          { id: "c11_07_01", name: "Concept of oxidation and reduction" },
          { id: "c11_07_02", name: "Oxidation number, balancing redox reactions" }
        ]
      },
      {
        id: "c11_08",
        name: "Organic Chemistry- Some Basic Principles and Techniques",
        topics: [
          { id: "c11_08_01", name: "General introduction, classification and IUPAC nomenclature" },
          { id: "c11_08_02", name: "Electronic displacements in a covalent bond" },
          { id: "c11_08_03", name: "Homolytic and heterolytic fission of a covalent bond" }
        ]
      },
      {
        id: "c11_09",
        name: "Hydrocarbons",
        topics: [
          { id: "c11_09_01", name: "Alkanes - Nomenclature, isomerism, conformations" },
          { id: "c11_09_02", name: "Alkenes - Nomenclature, structure of double bond" },
          { id: "c11_09_03", name: "Alkynes - Nomenclature, structure of triple bond" },
          { id: "c11_09_04", name: "Aromatic hydrocarbons - Introduction, IUPAC nomenclature" }
        ]
      }
    ],
    class12: [
      {
        id: "c12_01",
        name: "Solutions",
        topics: [
          { id: "c12_01_01", name: "Types of solutions, expression of concentration of solutions" },
          { id: "c12_01_02", name: "Solubility of gases in liquids, solid solutions" },
          { id: "c12_01_03", name: "Raoult's law, Colligative properties" },
          { id: "c12_01_04", name: "Abnormal molecular mass, Van't Hoff factor" }
        ]
      },
      {
        id: "c12_02",
        name: "Electrochemistry",
        topics: [
          { id: "c12_02_01", name: "Redox reactions, conductance in electrolytic solutions" },
          { id: "c12_02_02", name: "Kohlrausch's Law, electrolysis and laws of electrolysis" },
          { id: "c12_02_03", name: "Electrolytic cells and Galvanic cells" },
          { id: "c12_02_04", name: "Nernst equation and its application to chemical cells" }
        ]
      },
      {
        id: "c12_03",
        name: "Chemical Kinetics",
        topics: [
          { id: "c12_03_01", name: "Rate of a reaction (average and instantaneous)" },
          { id: "c12_03_02", name: "Factors affecting rate of reaction" },
          { id: "c12_03_03", name: "Integrated rate equations and half life" },
          { id: "c12_03_04", name: "Collision theory" }
        ]
      },
      {
        id: "c12_04",
        name: "d and f Block Elements",
        topics: [
          { id: "c12_04_01", name: "General introduction, electronic configuration" },
          { id: "c12_04_02", name: "Characteristics of transition metals (d-block)" },
          { id: "c12_04_03", name: "Lanthanoids and Actinoids" }
        ]
      },
      {
        id: "c12_05",
        name: "Coordination Compounds",
        topics: [
          { id: "c12_05_01", name: "Introduction, ligands, coordination number" },
          { id: "c12_05_02", name: "IUPAC nomenclature of mononuclear coordination compounds" },
          { id: "c12_05_03", name: "Werner's theory, VBT, and CFT" }
        ]
      },
      {
        id: "c12_06",
        name: "Haloalkanes and Haloarenes",
        topics: [
          { id: "c12_06_01", name: "Haloalkanes: Nomenclature, nature of C-X bond" },
          { id: "c12_06_02", name: "Haloarenes: Nature of C-X bond, substitution reactions" }
        ]
      },
      {
        id: "c12_07",
        name: "Alcohols, Phenols and Ethers",
        topics: [
          { id: "c12_07_01", name: "Alcohols: Nomenclature, methods of preparation" },
          { id: "c12_07_02", name: "Phenols: Nomenclature, methods of preparation" },
          { id: "c12_07_03", name: "Ethers: Nomenclature, methods of preparation" }
        ]
      },
      {
        id: "c12_08",
        name: "Aldehydes, Ketones and Carboxylic Acids",
        topics: [
          { id: "c12_08_01", name: "Aldehydes and Ketones: Nomenclature, nature of carbonyl group" },
          { id: "c12_08_02", name: "Carboxylic Acids: Nomenclature, acidic nature" }
        ]
      },
      {
        id: "c12_09",
        name: "Amines",
        topics: [
          { id: "c12_09_01", name: "Amines: Nomenclature, classification, structure" },
          { id: "c12_09_02", name: "Cyanides and Isocyanides" },
          { id: "c12_09_03", name: "Diazonium salts" }
        ]
      },
      {
        id: "c12_10",
        name: "Biomolecules",
        topics: [
          { id: "c12_10_01", name: "Carbohydrates - Classification, functions" },
          { id: "c12_10_02", name: "Proteins - Elementary idea of amino acids" },
          { id: "c12_10_03", name: "Vitamins - Classification and functions" },
          { id: "c12_10_04", name: "Nucleic Acids: DNA and RNA" }
        ]
      }
    ]
  },
  biology: {
    class11: [
      {
        id: "b11_01",
        name: "Diversity in Living World",
        topics: [
          { id: "b11_01_01", name: "What is living? ; Biodiversity; Need for classification" },
          { id: "b11_01_02", name: "Five kingdom classification" },
          { id: "b11_01_03", name: "Salient features and classification of Monera, Protista and Fungi" },
          { id: "b11_01_04", name: "Salient features and classification of plants" },
          { id: "b11_01_05", name: "Salient features and classification of animals" }
        ]
      },
      {
        id: "b11_02",
        name: "Structural Organisation in Animals and Plants",
        topics: [
          { id: "b11_02_01", name: "Morphology and modifications of different parts of flowering plants" },
          { id: "b11_02_02", name: "Anatomy and functions of different tissues and tissue systems" },
          { id: "b11_02_03", name: "Animal tissues; Morphology, anatomy and functions of an insect (cockroach)" }
        ]
      },
      {
        id: "b11_03",
        name: "Cell Structure and Function",
        topics: [
          { id: "b11_03_01", name: "Cell theory and cell as the basic unit of life" },
          { id: "b11_03_02", name: "Structure of prokaryotic and eukaryotic cell" },
          { id: "b11_03_03", name: "Chemical constituents of living cells: Biomolecules" },
          { id: "b11_03_04", name: "Cell division: Cell cycle, mitosis and meiosis" }
        ]
      },
      {
        id: "b11_04",
        name: "Plant Physiology",
        topics: [
          { id: "b11_04_01", name: "Photosynthesis as a means of Autotrophic nutrition" },
          { id: "b11_04_02", name: "Respiration: Glycolysis, fermentation, TCA cycle" },
          { id: "b11_04_03", name: "Plant growth and development" }
        ]
      },
      {
        id: "b11_05",
        name: "Human Physiology",
        topics: [
          { id: "b11_05_01", name: "Breathing and Respiration" },
          { id: "b11_05_02", name: "Body fluids and circulation" },
          { id: "b11_05_03", name: "Excretory products and their elimination" },
          { id: "b11_05_04", name: "Locomotion and Movement" },
          { id: "b11_05_05", name: "Neural control and coordination" },
          { id: "b11_05_06", name: "Chemical coordination and regulation" }
        ]
      }
    ],
    class12: [
      {
        id: "b12_01",
        name: "Reproduction",
        topics: [
          { id: "b12_01_01", name: "Sexual reproduction in flowering plants" },
          { id: "b12_01_02", name: "Human Reproduction" },
          { id: "b12_01_03", name: "Reproductive health" }
        ]
      },
      {
        id: "b12_02",
        name: "Genetics and Evolution",
        topics: [
          { id: "b12_02_01", name: "Heredity and variation: Mendelian Inheritance" },
          { id: "b12_02_02", name: "Molecular basis of Inheritance" },
          { id: "b12_02_03", name: "Evolution: Origin of life, biological evolution" }
        ]
      },
      {
        id: "b12_03",
        name: "Biology and Human Welfare",
        topics: [
          { id: "b12_03_01", name: "Health and Disease; Pathogens; parasites causing human diseases" },
          { id: "b12_03_02", name: "Microbes in human welfare" }
        ]
      },
      {
        id: "b12_04",
        name: "Biotechnology and Its Applications",
        topics: [
          { id: "b12_04_01", name: "Principles and process of Biotechnology: Genetic engineering" },
          { id: "b12_04_02", name: "Application of Biotechnology in health and agriculture" }
        ]
      },
      {
        id: "b12_05",
        name: "Ecology and Environment",
        topics: [
          { id: "b12_05_01", name: "Organisms and environment: Population, interactions" },
          { id: "b12_05_02", name: "Ecosystem: Patterns, components; productivity and decomposition" },
          { id: "b12_05_03", name: "Biodiversity and its conservation" }
        ]
      }
    ]
  }
};
