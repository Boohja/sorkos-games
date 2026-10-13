export const lowRankGlaiveBuilds = [
    {
        id: 'hr-1-3', rank: 'HR 1–3', name: 'Evade Mounter', purpose: 'Mobility and mounting.',
        weapon: 'Bone Staff II', alternative: 'Chata Glaive I',
        armor: ['Vespoid Helm', 'Vespoid Mail', 'Balahara Vambraces', 'Balahara Coil', 'Balahara Greaves'],
        charm: 'None required', kinsect: 'Mauldrone',
        skills: ['Evade Extender 3', 'Survival Expert 2', 'Attack Boost 1', 'Focus 1'],
        bonus: 'Master Mounter', jewels: 'None',
    },
    {
        id: 'hr-3-5', rank: 'HR 3–5', name: 'Blast Mounter', purpose: 'Blast damage and safer dodges.',
        weapon: 'Ajara Trident I', alternative: 'Barina Perche II (paralysis)',
        armor: ['Rey Sandhelm', 'Rey Sandmail', 'Hirabami Vambraces', 'Hirabami Coil', 'Hirabami Greaves'],
        charm: 'Blessing Charm I', kinsect: 'Mauldrone',
        skills: ['Evade Window 3', 'Constitution 1', 'Power Prolonger 2', 'Latent Power 1'],
        bonus: 'Master Mounter', jewels: 'None',
    },
    {
        id: 'hr-6-8', rank: 'HR 6–8', name: 'Dragon Flayer', purpose: 'Wounds and stamina.',
        weapon: 'G. Veldian Trudis I', alternative: 'Guardian Rathmaul I (fire)',
        armor: ['G. Arkveld Helm', 'G. Arkveld Mail', 'G. Arkveld Vambraces', 'G. Arkveld Coil', 'Rey Sandgreaves'],
        charm: 'Fitness Charm I', kinsect: 'Gullshad / Mauldrone',
        skills: ['Constitution 5', 'Flayer 3', 'Dragon Attack 2', 'Power Prolonger 2'],
        bonus: 'Decimator II', jewels: 'Weapon: 2 × Dragon Jewel [1]. Armor: 3 × Physique Jewel [1].',
    },
] as const;
