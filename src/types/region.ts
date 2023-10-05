import { z } from "zod";

const regionMapping = [
  ["na", "na1"],
  ["euw", "euw1"],
  ["eune", "eun1"],
  ["kr", "kr"],
  ["tr", "tr1"],
  ["br", "br1"],
  ["lan", "la1"],
  ["las", "la2"],
  ["oce", "oc1"],
  ["jp", "jp1"],
  ["ru", "ru"],
  ["tw", "tw2"],
  ["ph", "ph2"],
  ["sg", "sg2"],
  ["vn", "vn2"],
  ["th", "th2"],
] as const;

export type Region = typeof regionMapping[number][0];
export const regions: [Region, ...Region[]] = [
    regionMapping[0][0],
    ...regionMapping.slice(1).map(([region]) => region)
];
export const RegionSchema = z.enum(regions);

export type InternalRegion = typeof regionMapping[number][1];
export const internalRegions: [InternalRegion, ...InternalRegion[]] = [
    regionMapping[0][1],
    ...regionMapping.slice(1).map(([,internalRegion]) => internalRegion)
];
export const InternalRegionSchema = z.enum(internalRegions);

const regionMappingRecord: Record<Region, InternalRegion> = Object.fromEntries(regionMapping) as Record<Region, InternalRegion>;
const internalRegionMappingRecord: Record<InternalRegion, Region> = Object.fromEntries(regionMapping.map(([r, ir]) => [ir, r])) as Record<InternalRegion, Region>;

export function regionToInternalRegion(region: Region): InternalRegion {
  return regionMappingRecord[region];
}

export function internalRegionToRegion(internalRegion: InternalRegion): Region {
  return internalRegionMappingRecord[internalRegion];
}
