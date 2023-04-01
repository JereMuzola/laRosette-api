import { AgentModel } from "./agent";
export declare class ServiceModel {
    code: string;
    nom: string;
    description: string;
    fkAgentGerant: string;
    status: boolean;
    dateCreate: Date;
    agentGerant: any;
    fkAgent: string;
    agent: AgentModel;
    static fromEntity(snapshot: any): ServiceModel;
}
