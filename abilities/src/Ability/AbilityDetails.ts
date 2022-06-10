class AbilityDetails {
    effect: string;
    short_effect: string;
    constructor(effect_entries:any) {
        // @ts-ignore
        this.effect= effect_entries[0].effect;
        this.short_effect = effect_entries[0].short_effect
    }
}
export default AbilityDetails