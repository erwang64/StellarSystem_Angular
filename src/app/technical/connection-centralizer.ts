import { User } from "../model/user";
import { IConnexionListener } from "./iconnexion-listener";

export class ConnectionCentralizer {
    private static instance: ConnectionCentralizer;
    private listeners: IConnexionListener[] = new Array<IConnexionListener>();
    public user!: User | null;
    public jwt!: string | null;
    
    private constructor() { }
public static getInstance(): ConnectionCentralizer {
    if (!ConnectionCentralizer.instance) {
        ConnectionCentralizer.instance = new ConnectionCentralizer();
    }
    return ConnectionCentralizer.instance;
}

    connectionChanged(newConnectionUser: User | null, jwt: string | null) {
        this.user = newConnectionUser;
        this.jwt = jwt;
        this.listeners.forEach((curlListener) => {
            curlListener.connectionChanged(newConnectionUser);
        });
    }

    addListener(listener: IConnexionListener) {
        this.listeners.push(listener);
    }

    removeListener(listener : IConnexionListener) {
        this.listeners.filter((currentListener) => listener.getName() !== currentListener.getName());
    }

    isLooggedIn(): boolean {
        return this.user != null && this.jwt != null;
    }
}  
