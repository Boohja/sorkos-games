export type GlaiveBuild = {
    id: string; rank: string; navLabel?: string; name: string; purpose: string;
    weapon: string; alternative: string; armor: readonly string[];
    charm: string; kinsect: string; skills: readonly string[];
    bonus: string; jewels: string; armorJewels?: string; note?: string; jewelNote?: string;
};

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
] as const satisfies readonly GlaiveBuild[];

export const highRankGlaiveBuilds = [
    {
        id: 'hr-50-frenzy', rank: 'HR 50+', navLabel: 'HR 50+ · Frenzy', name: 'Zoh Shia Frenzy', purpose: 'Affinity, stamina and passive recovery.',
        weapon: 'Diprielcha (element matched to the monster)',
        alternative: 'Blazing Katir. Weapon jewels: Mastery [3], Critical II [2], Critical [1].',
        armor: ['Numinous Crown β', 'Numinous Shroud β', 'G. Arkveld Vambraces β', 'Gore Coil β', 'Gore Greaves β'],
        charm: 'Challenger Charm II', kinsect: 'Arkmaiden / Foebeetle',
        skills: ['Weakness Exploit 5', 'Agitator 5', 'Constitution 5', 'Antivirus 3', 'Critical Boost 5', "Master’s Touch 1"],
        bonus: 'Black Eclipse I · Super Recovery I',
        jewels: 'Diprielcha: Critical Jewel III [3], Critical Jewel II [2], Mastery Jewel [3].',
        armorJewels: '3 × Tenderizer [3], 1 × Chain [3], 2 × Phoenix [2], 3 × Physique [1], 2 × Sane [1], 1 × Recovery [1].',
        note: 'Requires High Rank Zoh Shia. Clear the Frenzy infection to activate the affinity bonus; keep Antivirus 3. No Arch-tempered armor required.',
        jewelNote: 'Use three matching element parts with Attack Infusion; prioritize attack reinforcements. Skill levels assume Diprielcha and the listed jewels. No random talisman needed.',
    },
    {
        id: 'hr-50-comfort', rank: 'HR 50+', navLabel: 'HR 50+ · Comfort', name: 'Fulgur–Zoh Comfort', purpose: 'More stamina and safer movement; no Frenzy management.',
        weapon: 'Diprielcha (paralysis)',
        alternative: 'Blazing Katir. Weapon jewels: Flight/Handicraft [3], Critical II [2], Critical [1].',
        armor: ['Numinous Crown β', 'G. Fulgur Mail β', 'Rey Sandbraces γ', 'Numinous Overlay β', 'G. Fulgur Greaves β'],
        charm: 'Challenger Charm II', kinsect: 'Arkmaiden / Foebeetle',
        skills: ['Agitator 5', 'Constitution 4', 'Maximum Might 3', 'Weakness Exploit 3', 'Earplugs 2', 'Evade Extender 2'],
        bonus: 'Second Wind I · Super Recovery I',
        jewels: 'Diprielcha: Critical Jewel III [3], Expert Jewel III [3], Flight/Handicraft Jwl [3].',
        armorJewels: '3 × Tenderizer [3], 2 × Earplugs [2], 2 × Mighty [2], 4 × Physique [1].',
        note: 'Requires High Rank Zoh Shia and Arch-tempered Rey Dau for the γ arms. Maximum Might rewards full stamina; repeated vaults reduce its uptime.',
        jewelNote: 'Use three paralysis parts with Attack Infusion. Reinforcements: 3 × Attack, 1 × Affinity, 1 × Sharpness. No random talisman needed.',
    },
] as const satisfies readonly GlaiveBuild[];

export const glaiveBuilds: readonly GlaiveBuild[] = [...lowRankGlaiveBuilds, ...highRankGlaiveBuilds];
