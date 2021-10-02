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
 * Sinister
 *
 * @ORM\Table(name="sinister")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\SinisterRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(fields={"number"}, repositoryMethod="getUniqueNotDeleted")
 * @ExclusionPolicy("all")
 */

class Sinister
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
     * Many Sinister have one Productor. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Productor")
     * @ORM\JoinColumn(name="productor_id", referencedColumnName="id")
     * @Expose
     */
    private $productor;

    /**
     * One Sinister has One Customer.
     * @ORM\OneToOne(targetEntity="Customer", mappedBy="sinister")
     * @Expose
     */
    private $customer;

    /**
     * One Sinister has One Order.
     * @ORM\OneToOne(targetEntity="Order")
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id", nullable=true)
     * @Expose
     */
    private $order;

    /**
     * Many Sinister have one Company. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumn(name="company_id", referencedColumnName="id")
     * @Expose
     */
    private $company;
    
    /**
     * Many Sinister have one Productor. This is the owning side.
     * @ORM\ManyToOne(targetEntity="SinisterStatus")
     * @ORM\JoinColumn(name="status_id", referencedColumnName="id")
     * @Expose
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=64)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 3,
     *      max = 32
     * )
     * @Expose
     */
    private $number;

    /**
     * @var \Date
     *
     * @ORM\Column(name="date", type="date")
     * @Assert\NotBlank()
     * @Expose
     */
    private $date;

    /**
     * @var float
     *
     * @ORM\Column(name="amount", type="float")
     * @Assert\NotBlank()
     * @Expose
     */
    private $amount;

    /**
     * @var string|null
     *
     * @ORM\Column(name="observations", type="text", nullable=true)
     * @Assert\NotBlank()
     * @Expose
     */
    private $observations;

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
     * Set number.
     *
     * @param string $number
     *
     * @return Sinister
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number.
     *
     * @return string
     */
    public function getNumber()
    {
        return $this->number;
    }
    
    
    /**
     * Set date.
     *
     * @param string $date
     *
     * @return Sinister
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date.
     *
     * @return string
     */
    public function getDate()
    {
        return $this->date;
    }
    
    /**
     * Set amount.
     *
     * @param string $amount
     *
     * @return Sinister
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount.
     *
     * @return string
     */
    public function getAmount()
    {
        return $this->amount;
    }
    
    /**
     * Set productor.
     *
     * @param string $productor
     *
     * @return Sinister
     */
    public function setProductor($productor)
    {
        $this->productor = $productor;

        return $this;
    }

    /**
     * Get productor.
     *
     * @return string
     */
    public function getProductor()
    {
        return $this->productor;
    }
    
    /**
     * Set sinister.
     *
     * @param string $sinister
     *
     * @return Sinister
     */
    public function setSinister($sinister)
    {
        $this->sinister = $sinister;

        return $this;
    }

    
    /**
     * Set company.
     *
     * @param string $company
     *
     * @return Sinister
     */
    public function setCompany($company)
    {
        $this->company = $company;

        return $this;
    }

    /**
     * Get company.
     *
     * @return string
     */
    public function getCompany()
    {
        return $this->company;
    }
    
    /**
     * Set order.
     *
     * @param string $order
     *
     * @return Sinister
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get order.
     *
     * @return string
     */
    public function getOrder()
    {
        return $this->order;
    }
    
    /**
     * Set status.
     *
     * @param string $status
     *
     * @return Sinister
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set observations.
     *
     * @param string|null $observations
     *
     * @return Sinister
     */
    public function setObservations($observations = null)
    {
        $this->observations = $observations;

        return $this;
    }

    /**
     * Get observations.
     *
     * @return string|null
     */
    public function getObservations()
    {
        return $this->observations;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Sinister
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
     * @return Sinister
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
     * @return Sinister
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
