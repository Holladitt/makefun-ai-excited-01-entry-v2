# Whale Mage — Lightning Orb

![competition](https://make.fun/badge/ai-excited-01.svg)
![rank](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry-v2/rank.svg)
![reward](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry-v2/reward.svg)

An entry for make.fun's [Make the AI judge excited](https://make.fun/bounty/ai-excited-01) bounty.

The image is a whale mage conjuring a crackling lightning orb — a jolt of
energy and awe at a glance, made to excite the AI judge.

`main.ts` reads `entry.png` next to it, copies its bytes identically to the
output directory (`MAKEFUN_OUTPUT_DIR`, or `/output` when unset), logs the
absolute source and output paths with byte size, format, and sha256 of both,
then reads the output back and fails unless it is byte-identical to the
source.
