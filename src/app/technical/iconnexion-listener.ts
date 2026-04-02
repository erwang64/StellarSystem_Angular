import { User } from "../model/user";

export interface IConnexionListener {

    /*
    *this method is called when the connection is established
    *@param newProfile the new profile of the user
    */
    
    connectionChanged(newProfile: User | null): void;

    /**
     * @returns the current profile of the user
     */

    getName(): string;

}
