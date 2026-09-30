export const NODE_NAME_REFERENCES = {
  nodeName: "{nodeName}",
  NodeName: "{NodeName}",
  "node-name": "{node-name}",
  node_name: "{node_name}",
  NODE_NAME: "{NODE_NAME}",
};

export const NODE_PREFIX_REFERENCES = {
  nodePrefix: "{nodePrefix}",
  NodePrefix: "{NodePrefix}",
  "node-prefix": "{node-prefix}",
  node_prefix: "{node_prefix}",
  NODE_PREFIX: "{NODE_PREFIX}",
};

export const REFERENCES = {
  folderName: "{folderName}",
  FolderName: "{FolderName}",
  "folder-name": "{folder-name}",
  folder_name: "{folder_name}",
  FOLDER_NAME: "{FOLDER_NAME}",

  ...NODE_NAME_REFERENCES,
  ...NODE_PREFIX_REFERENCES,
};
