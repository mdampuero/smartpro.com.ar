<?php

namespace Inamika\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * SinisterItem
 *
 * @ORM\Table(name="sinister_item")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\SinisterItemRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class SinisterItem
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
     * @var string
     *
     * @ORM\ManyToOne(targetEntity="Sinister", inversedBy="items",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="sinister_id", referencedColumnName="id")
     */
    private $sinister;

    /**
     * One Cart has One Product.
     * @ORM\ManyToOne(targetEntity="Product")
     * @ORM\JoinColumn(name="product_id", referencedColumnName="id")
     */
    private $product;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float",nullable=true)
     */
    private $price;
   
    /**
     * @var float
     *
     * @ORM\Column(name="cost", type="float",nullable=true)
     */
    private $cost;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255,nullable=true)
     */
    private $description;
    
    /**
     * @var string
     *
     * @ORM\Column(name="bill", type="string", length=255,nullable=true)
     */
    private $bill;

    /**
     * @var string
     *
     * @ORM\Column(name="departure_date", type="string", length=255,nullable=true)
     */
    private $departureDate;

    /**
     * @var string
     *
     * @ORM\Column(name="arrival_date", type="string", length=255,nullable=true)
     */
    private $arrivalDate;

    /**
     * @var string
     *
     * @ORM\Column(name="transport", type="string", length=255,nullable=true)
     */
    private $transport;

    /**
     * @var string
     *
     * @ORM\Column(name="sku", type="string", length=255)
     */
    private $sku;

    /**
     * @var int
     *
     * @ORM\Column(name="amount", type="integer")
     */
    private $amount;

    /**
     * @var string
     *
     * @ORM\Column(name="subtotal", type="string", length=255)
     */
    private $subtotal;
    
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
     */
    private $isDelete=false;

    /**
     * Many Products have one Provider. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Provider")
     * @ORM\JoinColumn(name="provider_id", referencedColumnName="id")
     * @Expose
     */
    private $provider;

    public function __construct()
    {
        
    }

    /**
     * Set provider.
     *
     * @param string|null $provider
     *
     * @return Product
     */
    public function setProvider($provider = null)
    {
        $this->provider = $provider;

        return $this;
    }

    /**
     * Get provider.
     *
     * @return string|null
     */
    public function getProvider()
    {
        return $this->provider;
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
     * Set sinister.
     *
     * @param string $sinister
     *
     * @return SinisterItem
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
     * Set departureDate.
     *
     * @param string $departureDate
     *
     * @return SinisterItem
     */
    public function setDepartureDate($departureDate)
    {
        $this->departureDate = $departureDate;

        return $this;
    }

    /**
     * Get departureDate.
     *
     * @return string
     */
    public function getDepartureDate()
    {
        return $this->departureDate;
    }
    
    /**
     * Set arrivalDate.
     *
     * @param string $arrivalDate
     *
     * @return SinisterItem
     */
    public function setArrivalDate($arrivalDate)
    {
        $this->arrivalDate = $arrivalDate;

        return $this;
    }

    /**
     * Get arrivalDate.
     *
     * @return string
     */
    public function getArrivalDate()
    {
        return $this->arrivalDate;
    }
    
    /**
     * Set transport.
     *
     * @param string $transport
     *
     * @return SinisterItem
     */
    public function setTransport($transport)
    {
        $this->transport = $transport;

        return $this;
    }

    /**
     * Get transport.
     *
     * @return string
     */
    public function getTransport()
    {
        return $this->transport;
    }

    /**
     * Set product.
     *
     * @param string $product
     *
     * @return SinisterItem
     */
    public function setProduct($product)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product.
     *
     * @return string
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set price.
     *
     * @param float $price
     *
     * @return SinisterItem
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return float
     */
    public function getPrice()
    {
        return $this->price;
    }
    
    /**
     * Set cost.
     *
     * @param float $cost
     *
     * @return SinisterItem
     */
    public function setCost($cost)
    {
        $this->cost = $cost;

        return $this;
    }

    /**
     * Get cost.
     *
     * @return float
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return SinisterItem
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
    
    /**
     * Set bill.
     *
     * @param string $bill
     *
     * @return SinisterItem
     */
    public function setBill($bill)
    {
        $this->bill = $bill;

        return $this;
    }

    /**
     * Get bill.
     *
     * @return string
     */
    public function getBill()
    {
        return $this->bill;
    }

    /**
     * Set sku.
     *
     * @param string $sku
     *
     * @return SinisterItem
     */
    public function setSku($sku)
    {
        $this->sku = $sku;

        return $this;
    }

    /**
     * Get sku.
     *
     * @return string
     */
    public function getSku()
    {
        return $this->sku;
    }

    /**
     * Set amount.
     *
     * @param int $amount
     *
     * @return SinisterItem
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount.
     *
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set subtotal.
     *
     * @param string $subtotal
     *
     * @return SinisterItem
     */
    public function setSubtotal($subtotal)
    {
        $this->subtotal = $subtotal;

        return $this;
    }

    /**
     * Get subtotal.
     *
     * @return string
     */
    public function getSubtotal()
    {
        return $this->subtotal;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return SinisterItem
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
     * @return SinisterItem
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
     * @return SinisterItem
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
