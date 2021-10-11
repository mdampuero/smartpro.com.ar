<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
/**
 * Locality
 *
 * @ORM\Table(name="locality")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\LocalityRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */

class Locality
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @Expose
     */
    private $id;

     /**
     * Many departments have one provence. This is the owning side.
     * @ORM\ManyToOne(targetEntity="Provence")
     * @ORM\JoinColumn(name="provence_id", referencedColumnName="id")
     */
    private $provence;

    /**
     * Many departments have one department. This is the owning side.
     * @ORM\ManyToOne(targetEntity="Department")
     * @ORM\JoinColumn(name="department_id", referencedColumnName="id")
     * @Expose
     */
    private $department;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255,nullable=true)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 64
     * )
     * @Expose
     */
    private $name="Desconocido";
    
    /**
     * @var float
     *
     * @ORM\Column(name="lat", type="float", length=255, nullable=true)
     * @Expose
     */
    private $lat;
    
   /**
     * @var float
     *
     * @ORM\Column(name="lng", type="float", length=255, nullable=true)
     * @Expose
     */
    private $lng;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_delete", type="boolean")
     * @Expose
     */
    private $isDelete=false;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Locality
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Set lat.
     *
     * @param string $lat
     *
     * @return Locality
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat.
     *
     * @return string
     */
    public function getLat()
    {
        return $this->lat;
    }
    
    /**
     * Set lng.
     *
     * @param string $lng
     *
     * @return Locality
     */
    public function setLng($lng)
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * Get lng.
     *
     * @return string
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Set provence.
     *
     * @param string $provence
     *
     * @return Department
     */
    public function setProvence($provence)
    {
        $this->provence = $provence;

        return $this;
    }

    /**
     * Get provence.
     *
     * @return string
     */
    public function getProvence()
    {
        return $this->provence;
    }
    
    /**
     * Set department.
     *
     * @param string $department
     *
     * @return Locality
     */
    public function setDepartment($department)
    {
        $this->department = $department;

        return $this;
    }

    /**
     * Get department.
     *
     * @return string
     */
    public function getDepartment()
    {
        return $this->department;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Locality
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return Locality
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set isDelete.
     *
     * @param bool $isDelete
     *
     * @return Locality
     */
    public function setIsDelete($isDelete)
    {
        $this->isDelete = $isDelete;

        return $this;
    }

    /**
     * Get isDelete.
     *
     * @return bool
     */
    public function getIsDelete()
    {
        return $this->isDelete;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
    {
        $this->createdAt=new \DateTime();
    }
    
    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function setUpdatedAtValue()
    {
        $this->updatedAt=new \DateTime();
    }
}
