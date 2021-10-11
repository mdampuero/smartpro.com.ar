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
 * Customer
 *
 * @ORM\Table(name="customer")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\CustomerRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(fields={"username"}, repositoryMethod="getUniqueNotDeleted")
 * @ExclusionPolicy("all")
 */

class Customer
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
     * One Sinister has One Customer.
     * @ORM\OneToOne(targetEntity="Cart", mappedBy="customer")
     * @Expose
     */
    private $cart;

    /**
     * One Customer has One Sinister.
     * @ORM\OneToOne(targetEntity="Sinister")
     * @ORM\JoinColumn(name="sinister_id", referencedColumnName="id")
     * @Expose
     */
    private $sinister;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255)
     * @Expose
     */
    private $username;

    /**
     * @var float
     *
     * @ORM\Column(name="balance", type="float", length=255)
     * @Expose
     */
    private $balance;
    
    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     * @Expose
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $name;
    
    /**
     * @var string
     *
     * @ORM\Column(name="document", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $document;
    
    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Expose
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $phone;
    
    /**
     * @var string
     *
     * @ORM\Column(name="street", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $street;
    
    /**
     * @var string
     *
     * @ORM\Column(name="department", type="string", length=255, nullable=true)
     * @Expose
     */
    private $department;
    
    /**
     * @var string
     *
     * @ORM\Column(name="floor", type="string", length=255, nullable=true)
     * @Expose
     */
    private $floor;
    
    /**
     * @var string
     *
     * @ORM\Column(name="postal_code", type="string", length=255, nullable=true)
     * @Assert\NotBlank()
     * @Expose
     */
    private $postalCode;
    
    /**
     * Many Customer have one Provence. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Provence")
     * @ORM\JoinColumn(name="provence_id", referencedColumnName="id")
     * @Expose
     */
    private $provence;
    
    /**
     * Many Customer have one Provence. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Locality")
     * @ORM\JoinColumn(name="locality_id", referencedColumnName="id")
     * @Expose
     */
    private $locality;

    /**
     * @var string
     *
     * @ORM\Column(name="street_number", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $streetNumber;


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
     * @var bool
     *
     * @ORM\Column(name="is_active", type="boolean")
     * @Expose
     */
    private $isActive=true;

    public function __construct()
    {
        // $this->name=$name;
        // $this->username=$username;
        // $this->password=$password;
        // $this->balance=$balance;
        // $this->sinister=$sinister;
    }

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
     * @return Customer
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
     * Set username.
     *
     * @param string $username
     *
     * @return Customer
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username.
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }
    
    /**
     * Set sinister.
     *
     * @param string $sinister
     *
     * @return Customer
     */
    public function setSinister($sinister)
    {
        $this->sinister = $sinister;

        return $this;
    }

    /**
     * Get sinister.
     *
     * @return string
     */
    public function getSinister()
    {
        return $this->sinister;
    }
    
    /**
     * Set cart.
     *
     * @param string $cart
     *
     * @return Customer
     */
    public function setCart($cart)
    {
        $this->cart = $cart;

        return $this;
    }

    /**
     * Get cart.
     *
     * @return string
     */
    public function getCart()
    {
        return $this->cart;
    }
    
    /**
     * Set balance.
     *
     * @param string $balance
     *
     * @return Customer
     */
    public function setBalance($balance)
    {
        $this->balance = $balance;

        return $this;
    }

    /**
     * Get balance.
     *
     * @return string
     */
    public function getBalance()
    {
        return $this->balance;
    }
    
    /**
     * Set document.
     *
     * @param string $document
     *
     * @return Customer
     */
    public function setDocument($document)
    {
        $this->document = $document;

        return $this;
    }

    /**
     * Get document.
     *
     * @return string
     */
    public function getDocument()
    {
        return $this->document;
    }
    
    /**
     * Set phone.
     *
     * @param string $phone
     *
     * @return Customer
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }
    
    /**
     * Set provence.
     *
     * @param string $provence
     *
     * @return Customer
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
     * Set locality.
     *
     * @param string $locality
     *
     * @return Customer
     */
    public function setLocality($locality)
    {
        $this->locality = $locality;

        return $this;
    }

    /**
     * Get locality.
     *
     * @return string
     */
    public function getLocality()
    {
        return $this->locality;
    }
    
    /**
     * Set street.
     *
     * @param string $street
     *
     * @return Customer
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street.
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }
    
    /**
     * Set department.
     *
     * @param string $department
     *
     * @return Customer
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
     * Set floor.
     *
     * @param string $floor
     *
     * @return Customer
     */
    public function setFloor($floor)
    {
        $this->floor = $floor;

        return $this;
    }

    /**
     * Get floor.
     *
     * @return string
     */
    public function getFloor()
    {
        return $this->floor;
    }
    
    /**
     * Set postalCode.
     *
     * @param string $postalCode
     *
     * @return Customer
     */
    public function setPostalCode($postalCode)
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    /**
     * Get postalCode.
     *
     * @return string
     */
    public function getPostalCode()
    {
        return $this->postalCode;
    }
    
    /**
     * Set streetNumber.
     *
     * @param string $streetNumber
     *
     * @return Customer
     */
    public function setStreetNumber($streetNumber)
    {
        $this->streetNumber = $streetNumber;

        return $this;
    }

    /**
     * Get streetNumber.
     *
     * @return string
     */
    public function getStreetNumber()
    {
        return $this->streetNumber;
    }
    
    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Customer
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password.
     *
     * @param string $password
     *
     * @return Customer
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Customer
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Customer
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
     * @return Customer
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
     * @return Customer
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
     * Set isActive.
     *
     * @param bool $isActive
     *
     * @return Customer
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive.
     *
     * @return bool
     */
    public function getIsActive()
    {
        return $this->isActive;
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
