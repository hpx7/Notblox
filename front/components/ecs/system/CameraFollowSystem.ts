import { Entity } from "@shared/entity/Entity";
import { FollowComponent } from "../component/FollowComponent";
import { PositionComponent } from "@shared/component/PositionComponent";
import * as THREE from "three";

// Define systems
export class CameraFollowSystem {
  constructor(public lerpFactor = 0.05, private angle = 0) {}

  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const positionComponent = entity.getComponent(PositionComponent);
      const followComponent = entity.getComponent(FollowComponent);

      if (followComponent && positionComponent) {
        // Adjust the position of the entity to follow the target
        const camera = followComponent.camera;
        const targetPosition = new THREE.Vector3(
          positionComponent.x,
          positionComponent.y + camera.offset.y,
          positionComponent.z + camera.offset.z
        );

        // Use lerp to smoothly move the camera towards the target position
        camera.position.lerp(targetPosition, this.lerpFactor);
      }
    });
  }
}

/* FPS mode
       const targetPosition = new THREE.Vector3(
          positionComponent.x,
          positionComponent.y + 1,
          positionComponent.z
        );

        // Use lerp to smoothly move the camera towards the target position
        camera.position.lerp(targetPosition, this.lerpFactor);

        camera.lookAt(targetPosition);
      }
      */