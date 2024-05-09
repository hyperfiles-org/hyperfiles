/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A project is a collection of artifacts
 */
export interface Project {
    version: number;
    name: string;
    display_name: string;
    description?: string;
    github?: URL[];
    npm?: URL[];
    blockchain?: BlockchainAddress[];
    [k: string]: unknown;
  }
  /**
   * A generic URL
   */
  export interface URL {
    url: string;
    [k: string]: unknown;
  }
  /**
   * An address on a blockchain
   */
  export interface BlockchainAddress {
    address: string;
    /**
     * @minItems 1
     */
    tags: [
      (
        | "contract"
        | "creator"
        | "deployer"
        | "eoa"
        | "factory"
        | "proxy"
        | "safe"
        | "wallet"
      ),
      ...(
        | "contract"
        | "creator"
        | "deployer"
        | "eoa"
        | "factory"
        | "proxy"
        | "safe"
        | "wallet"
      )[],
    ];
    /**
     * @minItems 1
     */
    networks: [
      (
        | "arbitrum-one"
        | "base"
        | "frax"
        | "mainnet"
        | "matic"
        | "metal"
        | "mode"
        | "optimism"
        | "pgn"
        | "zora"
      ),
      ...(
        | "arbitrum-one"
        | "base"
        | "frax"
        | "mainnet"
        | "matic"
        | "metal"
        | "mode"
        | "optimism"
        | "pgn"
        | "zora"
      )[],
    ];
    name?: string;
    [k: string]: unknown;
  }