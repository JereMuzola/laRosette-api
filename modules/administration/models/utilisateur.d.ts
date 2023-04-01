import { AgenceModel } from "./agence";
import { AgentModel } from "./agent";
export declare class UtilisateurModel {
    code: string;
    username: string;
    password: string;
    fkAgentCreate: string;
    fkAgent: string;
    status: boolean;
    dateCreate: Date;
    agentCreate: AgentModel;
    agent: AgentModel;
    role: string;
    fkAgence: string;
    agence: AgenceModel;
    static fromEntity(snapshot: any): UtilisateurModel;
}
