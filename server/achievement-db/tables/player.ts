import { IDatabase } from "pg-promise";
import {Player} from '../models/player'
import { handleMappingSingleRow } from '../util'
interface PlayerTableEntry {
    id: number
    account_id: number
    encrypted_account_id: string
    region: string
    player_name: string   
}

export class PlayerDB {
    private static PlayerTableMap: { [k in keyof PlayerTableEntry]: keyof Player | null} = {
        "account_id": "accountId",
        "encrypted_account_id": "encryptedAccountId",
        "id": "id",
        "player_name": "name",
        "region": "region"
    }
    public constructor(private db: IDatabase<any>) {

    }

    public getPlayerByAccountId(accountId: number, region: string): Promise<Player | null> {
        const vals = {
            "account_id": accountId,
            "region": region.toLowerCase()
        }
        return this.db.query("SELECT * from players WHERE account_id = ${account_id} and region = ${region} LIMIT 1", vals)
        .then((response: PlayerTableEntry[]) => {
            return handleMappingSingleRow<PlayerTableEntry, Player>(response, PlayerDB.PlayerTableMap);
        })
    }

    public getPlayerById(playerId: number) {
        const vals = {
            "id": playerId
        }
        return this.db.query("SELECT * from players WHERE id = ${id} LIMIT 1", vals).then((response) =>{ 
            return handleMappingSingleRow<PlayerTableEntry, Player>(response, PlayerDB.PlayerTableMap);
        });
    }

    public getPlayerByEncryptedAccountId(encryptedAccountId: string, region: string): Promise<Player | null> {
        return this.getPlayer(encryptedAccountId, region);
    }
    public getPlayer(encryptedAccountId: string, region: string): Promise<Player | null> {
        console.log("Looking for player " + encryptedAccountId + ", region: " + region);
        const vals = {
            "encrypted_account_id": encryptedAccountId,
            "region": region.toLowerCase()
        }
        return this.db.oneOrNone("SELECT * from players WHERE encrypted_account_id = ${encrypted_account_id} and region = ${region} LIMIT 1", vals)
        .then((response: PlayerTableEntry) => {
            if (response == null) {
                return null;
            }
            console.log("Response", response)
            return handleMappingSingleRow<PlayerTableEntry, Player>([response], PlayerDB.PlayerTableMap);
        })
    }

    public createPlayer(accountId: number, region: string, playerName: string, encryptedAccountId: string): Promise<Player | null> {
        const vals = {
            "account_id": accountId,
            "region": region,
            "player_name": playerName,
            "encrypted_account_id": encryptedAccountId
        }
        return this.db.query("INSERT INTO players (account_id, region, player_name, encrypted_account_id) VALUES (${account_id}, ${region}, ${player_name}, ${encrypted_account_id})", vals)
        .then((res) => {
            return this.getPlayer(encryptedAccountId, region);
        });
    }

    public searchPlayer(searchString: string, region: string): Promise<Player[]> {
        return this.db.query("SELECT * FROM players WHERE region = $1 and LOWER(player_name) LIKE '%$2#%' LIMIT 10", [region, searchString.toLowerCase()])
        .then((res) => {
            return res.map((response: any) => handleMappingSingleRow<PlayerTableEntry, Player>([response], PlayerDB.PlayerTableMap));
        })
    }
}