import AbilityDetails from "./AbilityDetails";


class AbilityType {
    name: string;
    abilities : AbilityDetails[]=[];
    constructor(name:string, abilitiesParam:AbilityDetails[]){
        this.name = name;
        // this.abilities = abilities;

        for (let i = 0; i < abilitiesParam.length; i++) {
            // @ts-ignore
            let filtered = abilitiesParam.filter(x=>x.language.name =='en')
            // @ts-ignore
            this.abilities = new AbilityDetails(filtered);
        }

    }
}
export default AbilityType