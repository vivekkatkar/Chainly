"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import React, { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";


const TriggerNode = ({ data } : {
    data : any
}) => (
  <div className="relative">
    <ZapCell name={data.name} index={data.index} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const ActionNode = ({ data } : {
    data : any 
}) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <ZapCell name={data.name} index={data.index} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const AddButtonNode = ({ data } : {
    data : any
}) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} />
    <PrimaryButton onClick={data.onClick}>
      <div className="text-2xl font-bold flex justify-center items-center">
        +
      </div>
    </PrimaryButton>
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  addButton: AddButtonNode,
};

function FlowCanvas({
  selectedTrigger,
  selectedActions,
  setSelectedActions,
}: {
  selectedTrigger: string;
  selectedActions: any;
  setSelectedActions: any;
}) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: "trigger",
      type: "trigger",
      position: { x: 250, y: 50 },
      data: {
        name: selectedTrigger || "Trigger",
        index: 1,
      },
    });

    selectedActions.forEach((action, index) => {
      const nodeId = `action-${index}`;
      nodes.push({
        id: nodeId,
        type: "action",
        position: { x: 250, y: 150 + index * 100 },
        data: {
          name: action.availableActionName,
          index: index + 2,
        },
      });

      const sourceId = index === 0 ? "trigger" : `action-${index - 1}`;
      edges.push({
        id: `edge-${sourceId}-${nodeId}`,
        source: sourceId,
        target: nodeId,
        type: "smoothstep",
        animated: true,
      });
    });

    const addButtonY =
      selectedActions.length > 0
        ? 250 + selectedActions.length * 100
        : 150;

    nodes.push({
      id: "add-button",
      type: "addButton",
      position: { x: 275, y: addButtonY },
      data: {
        onClick: () => {
          setSelectedActions((prev) => [
            ...prev,
            {
              availableActionId: "a",
              availableActionName: "Send Email",
            },
          ]);
        },
      },
    });

    const lastNodeId =
      selectedActions.length > 0
        ? `action-${selectedActions.length - 1}`
        : "trigger";

    edges.push({
      id: `edge-${lastNodeId}-add-button`,
      source: lastNodeId,
      target: "add-button",
      type: "smoothstep",
      animated: true,
    });

    return { nodes, edges };
  }, [selectedTrigger, selectedActions]);

  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={flowNodes}
      edges={flowEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      minZoom={0.5}
      maxZoom={2}
      onInit={(instance) => {
        instance.setViewport({ x: 100, y: 0, zoom: 1.2 }, { duration: 800 });
      }}
    >
      <Controls />
      <Background color="#94a3b8" gap={20} />
    </ReactFlow>
  );
}

export default function CreateZap() {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState([]);

  return (
    <div>
      <Appbar />
      <div className="w-full h-screen bg-slate-200">
        <ReactFlowProvider>
          <FlowCanvas
            selectedTrigger={selectedTrigger}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
