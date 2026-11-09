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

export const endgameGlaiveBuilds = [
    {
        id: 'hr-100-rathagore', rank: 'HR 100+', navLabel: 'HR 100+ · Rathagore', name: 'Rathagore',
        purpose: 'Guardian Rathalos 2-piece + Gore Magala 2-piece.',
        weapon: 'Limbo Llor — Gore Magala’s Tyranny / Lord’s Soul',
        armor: ['Arkvulcan Helm γ', 'Udra Miremail γ', 'G. Rathalos Vambraces β', 'G. Rathalos Coil α', 'Gore Greaves β'],
        charm: 'Agitator 3 talisman', kinsect: 'Arkmaiden / Foebeetle',
        skills: ['Agitator 5', 'Weakness Exploit 5', 'Critical Boost 5', 'Antivirus 3', 'Counterstrike 3', 'Maximum Might 3', 'Airborne 1', 'Burst 1'],
        bonus: 'Scorcher I · Black Eclipse I · Lord’s Soul',
        alternative: 'Use Poverty Arkgore until both required weapon bonuses are rolled.',
        jewels: 'Critical III [3], Critical II [2], Flight/Attack [3].',
        armorJewels: '2 × Challenger [3], Chain [3], Counter [2], 3 × Mighty [2], Earplugs [2], 2 × Sane [1].',
        note: 'Requires Arch-tempered Arkveld, Arch-tempered Nu Udra and transcended Guardian Rathalos armor. The talisman only needs Agitator 3; extra skills or slots are optional.',
        jewelNote: 'Element-heavy fight alternative: Arkvulcan Mail γ replaces Udra Miremail γ, trading Agitator 5 → 3 for Convert Element 3.',
    },
    {
        id: 'hr-100-arkgore', rank: 'HR 100+', navLabel: 'HR 100+ · Arkgore', name: 'Poverty Arkgore',
        purpose: 'Arkveld 2-piece + Gore Magala 2-piece; no weapon bonus rolls needed.',
        weapon: 'Limbo Llor — any set/group bonuses',
        armor: ['Arkvulcan Helm γ', 'Udra Miremail γ', 'Arkvulcan Vambraces γ', 'Gore Coil β', 'Sororal Boots α'],
        charm: 'Agitator 3 talisman', kinsect: 'Arkmaiden / Foebeetle',
        skills: ['Critical Boost 5', 'Weakness Exploit 5', 'Agitator 4', 'Antivirus 3', 'Counterstrike 3', 'Maximum Might 3', 'Airborne 1', 'Flayer 2'],
        bonus: 'Decimator I · Black Eclipse I · Lord’s Soul (from armor)',
        alternative: 'Rathagore once the weapon has Gore Magala’s Tyranny + Lord’s Soul.',
        jewels: 'Critical III [3], Critical II [2], Flight/Attack [3].',
        armorJewels: 'Challenger [3], Chain [3], 3 × Mighty [2], Counter [2], Earplugs [2], 3 × Sane [1].',
        note: 'Requires Arch-tempered Arkveld, Arch-tempered Nu Udra and Nadia’s Sororal armor. “Poverty” refers to the weapon’s set/group rolls; this is still late endgame gear.',
    },
] as const satisfies readonly GlaiveBuild[];

export const glaiveBuilds: readonly GlaiveBuild[] = [...lowRankGlaiveBuilds, ...highRankGlaiveBuilds, ...endgameGlaiveBuilds];

// Condensed priorities from MHWS Sets (TU4.5); tied numbers share priority.
export const glaiveSkillPriorities = [
    { title: 'Set / group', rows: [
        ['1', 'Lord’s Soul', 'Prioritize while Guts remains.'],
        ['2', 'Burst Boost I/II', 'Attack; longer Burst uptime.'],
        ['2', 'Scorcher I', 'Especially against fire weaknesses.'],
        ['3', 'Black Eclipse I', 'Affinity; requires Antivirus 3.'],
        ['3', 'Powerhouse I', 'Attack after successful offsets.'],
        ['4', 'Mutual Hostility I', 'Element during enrage.'],
        ['5', 'Azure Bolt I', 'Short affinity window.'],
        ['5', 'Second Wind I', 'Helps Maximum Might uptime.'],
    ] },
    { title: 'Armor', rows: [
        ['1', 'Maximum Might 3', 'Ground attacks preserve stamina.'],
        ['1', 'Agitator 2–5', 'Benefits from enrage uptime.'],
        ['1', 'Weakness Exploit 2–5', 'Reliable weak-point affinity.'],
        ['1', 'Burst 1+', 'Efficient first point.'],
        ['2', 'Counterstrike 3', 'Also triggered by hyperarmor.'],
        ['2', 'Latent Power 2+', 'Depends on activation uptime.'],
        ['3', 'Earplugs 1', 'Combines with triple extract.'],
        ['3', 'Flayer 1', 'Useful low investment.'],
        ['4', 'Convert Element 1', 'Requires frequent elemental hits.'],
    ] },
    { title: 'Weapon', rows: [
        ['1', 'Critical Boost 3/5', 'Prioritize with high affinity.'],
        ['1', 'Airborne', 'Also buffs key grounded moves.'],
        ['2', 'Attack Boost 4/5', 'Good with suitable talismans.'],
        ['2', 'Handicraft 1', 'Extra white sharpness.'],
        ['3', 'Critical Eye 3+', 'Avoid overcapping affinity.'],
        ['4', 'Master’s Touch / Razor Sharp 3', 'If sharpness becomes limiting.'],
    ] },
] as const;
